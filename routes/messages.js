const express = require('express'),
	router = express.Router(),
	auth = require('../middleware/auth');

const nodemailer = require("nodemailer");

const User = require('../models/UserSchema'),
	Message = require('./../models/MessageSchema');


const smtpTransport = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: "",
      pass: "",
    },
});

/* GET Product index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is message page",
	})
});

/* POST Message create msg  */
router.post('/create', auth.isAuthenticated, async(req, res) => {
	try{

		const { user_id, to_id } = req.body;

		let newMessage = new Message();

		newMessage.from_id = user_id;
		newMessage.to_id = to_id;
		newMessage.created_at = new Date();
		
		newMessage.save(function (err, saved) {
				if (err) {
					console.log(err)
					return res.status(500).json({
						success: false, 
						message: "Something has gone wrong!",
						system_error: err
					})
				}
	
				res.status(200).json({
					success: true,
					message: "Successfully sent",
				})
		})
	}catch(err){
		console.log("sent_message error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Message get all messages */
router.post('/get_all', auth.isAuthenticated, (req, res) => {
	try{
		Message.find({
		}, (error, messages) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});

			res.status(200).json({
				success: true,
				message: messages,
			});
		})
	}catch(err){
		console.log("get_all error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Message get all messages */
router.post('/get_message',  async(req, res) => {
	try{
		const { user_id } = req.body;

		const users = await User.find({}).select('_id username phone');

		Message.find().or([{ from_id: user_id }, { to_id: user_id }])
		.exec((err, messages) => {
			if (err) {
				if (err) return res.status(500).json({
					success: false,
					message: "There is something wrong with the system. Please contact Administrator immediately",
					system_error: err
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: "Successfully get message",
				data: messages,
				users
			});
		});
	}catch(err){
		console.log("get_message error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

const sendMail = async(email, content) => {
	const mailOptions = {
		from: "hello@clo4.com", // sender address
		to:   `${email}`,
		subject: "Message from Clo4",   // Subject line
		html :`
				${content}
			`
	};
	
	console.log("sending email...")
	await smtpTransport.sendMail(mailOptions).catch(err=>console.log(err));
}

module.exports = router;