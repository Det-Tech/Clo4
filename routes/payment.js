const express = require('express'),
	router = express.Router(),
	auth = require('../middleware/auth');

const User = require('../models/UserSchema'),
	Payment = require('./../models/PaymentSchema'),
	config = require('../config');

const stripe = require('stripe')(`${config.STRIPE_SECKEY}`);

/* GET Payment index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is payment page",
	})
});

/* POST Fiat Payment Transfer */
router.post('/confirm', async (req, res) => {
	try{
		const { amount, user_id } = req.body;		

		const user = await User.findOne({user_id});		

		const balance = await stripe.balance.retrieve();
		console.log("balanace: ", balance)
		
		const transfer = await stripe.transfers.create({
			amount: amount,
			currency: 'usd',
			destination: user?.stripe_account,
		}).catch(err=>{console.log(err); return err});
 
		console.log(transfer);
		console.log(transfer?.balance_transaction);

		res.status(200).json({
			success: true,
			message: "Successfully confirmed",
		})
	}catch(err){
		console.log("confirm_payment error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Fiat Payment Refund */
router.post('/refund', auth.isAuthenticated, async (req, res) => {
	try{
		const { user_id, amount } = req.body;
		const payment = await Payment.findOne({user_id, amount})		
		
		if(!payment) return res.status(200).json({
			success: false,
			message: "Can't find the payment history",
		})

		const refund = await stripe.refunds.create({
			charge: payment?.transaction,
		});

		payment.status = 2;
		payment.save();

		console.log('Refund ID:', refund.id);
		console.log('Refund Amount:', refund.amount);
		
		res.status(200).json({
			success: true,
			message: "Successfully refund",
		})

	}catch(err){
		console.log("refund_payment error", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Fiat Payment Payment By User */
router.post('/get', (req, res) => {
	const { user_id } = req.body;
	Payment.find({
		user_id
	}, (error, payments) => {
		if (error) return res.status(500).json({
			success: false,
			message: "There is something wrong with the system. Please contact Administrator immediately",
			system_error: error
		});
		if(payments){
			res.status(200).json({
				success: true,
				message: "Get successfully",
				data: payments
			});
		}else{
			res.status(200).json({
				success: false,
				message: "No payment",
			});
		}
	})
});

/* POST Fiat Payment payment Get All*/
router.post('/get_all', (req, res) => {
	Payment.find((error, payments) => {
		if (error) return res.status(500).json({
			success: false,
			message: "There is something wrong with the system. Please contact Administrator immediately",
			system_error: error
		});
		if(payments){
			res.status(200).json({
				success: true,
				message: "Get successfully",
				data: payments
			});
		}else{
			res.status(200).json({
				success: false,
				message: "No payment",
			});
		}
	})
});

/* POST Create Payment Intent */
router.post('/create_payment', auth.isAuthenticated, async(req, res) => {
	const { user_id, amount, description } = req.body;
	
	console.log(user_id, amount);

	User.findOne({
		_id: user_id
	}, async(error, user) => {
		if(error) {
			res.status(500).json({
				success: false,
				message: "Server Error"
			})
		}
		if(user){						// check whether user exist, true
			if(user?.customer_id){		// check whether customer_id exist, true
				const ephemeralKey = await stripe.ephemeralKeys.create(
					{customer: user.customer_id},
					{apiVersion: '2020-08-27'}
				); 

				const paymentIntent = await stripe.paymentIntents.create({
					amount: Number(amount) * 100, // Amount in cents
					currency: 'usd',
					payment_method_types: ['card'],
					customer: user.customer_id,
					description: description
				});

				res.status(200).json({
					success: true,
					data: {
						publishableKey: config.STRIPE_PUBKEY,
						paymentIntent: paymentIntent.client_secret,
						customer: user.customer_id,
						ephemeralKey: ephemeralKey.secret
					},
					message: "Successfully created",
				})
			}else{						// check whether customer_id exist, false
				stripe.customers.create({
					name: user.username,
					email: user.email,
				})
					.then(async(customer) => {
						user.customer_id = customer.id
						user.save();

						const ephemeralKey = await stripe.ephemeralKeys.create(
							{customer: user.customer_id},
							{apiVersion: '2020-08-27'}
						); 

						const paymentIntent = await stripe.paymentIntents.create({
							amount: Number(amount) * 100, // Amount in cents
							currency: 'usd',
							payment_method_types: ['card'],
							customer: user.customer_id,
							description: descriptions
						});

						res.status(200).json({
							success: true,
							data: {
									publishableKey: config.STRIPE_PUBKEY,
									paymentIntent: paymentIntent.client_secret,
									customer: customer.id,
									ephemeralKey: ephemeralKey.secret
							},
							message: "Successfully created",
						})
					})
					.catch(error => {
						console.error('Error creating customer:', error);
						res.status(500).json({
							success: false,
							message: "Got Error",
						})
					});
			}
		}else {							// check whether user exist, false
			res.status(500).json({
				success: false,
				message: "Empty User"
			})
		}
	})
});

/* POST Fiat Payment hook */
router.post('/hook', async (req, res) => {	
	// const sig = req.headers["stripe-signature"];

	if (req.body["type"] === "charge.succeeded") {
		const id = req.body["data"]["object"]["id"];
		const cus_id = req.body["data"]["object"]["customer"];
		const amount = req.body["data"]["object"]["amount"];
		const description = req.body["data"]["object"]["description"];
		console.log(cus_id);

		const user = await User.findOne({ customer_id: cus_id });
		
		console.log(req.body);
		console.log(description);

		let newPayment = new Payment();
		newPayment.user_id = user._id.toString();
		newPayment.amount = amount;
		newPayment.status = 1;    // confirm
		newPayment.transaction = id;  // transaction
		newPayment.created_at = new Date();
		
		newPayment.save(function (err, saved) {
				if (err) {
					console.log(err)
					return res.status(500).json({
						success: false,
						message: "Server Error",
						system_error: err
					});
				}else{
					console.log("saved payment history")
				}
		})
		
		return res.status(200).json({
			success: true,
			message: "Get successfully",
		});
	}

	return res.status(200).json({
		success: false,
		message: "Handle Not Charing",
	});

});

module.exports = router; 