const express = require('express'),
	router = express.Router(),
	jwt = require('jsonwebtoken'),
	jwtdecode = require('jwt-decode'),
	auth = require('../middleware/auth');

const User = require('../models/UserSchema'),
	config = require('../config');
const { getHash } = require('../utils/common');


/* POST User register */
router.post('/register', async(req, res) => {
	const { username, password, email, wallet, wallet_data } = req.body;
	let newUser = new User();

	newUser.username = username;
	newUser.password = await getHash(password);
	newUser.email = email;
	newUser.wallet = wallet;
	newUser.wallet_data = wallet_data;

	newUser.created_at = new Date();
	newUser.updated_at = new Date();
	
	newUser.save(function (err, saved) {
		if (err) {
			console.log(err)
			return res.status(500).json({
				success: false, 
				message: "Duplication username",
				system_error: err
			})
		}

		res.status(200).json({
			success: true,
			message: "Successfully registered",
		})

	})
});


/* POST User login */
router.post('/login', (req, res) => {
	const {username, password} = req.body;
	User.findOne({
		username: username
	}, (error, user) => {
		if (error) return res.status(200).json({
			success: false,
			message: "There is something wrong with the system. Please contact Administrator immediately",
			system_error: error
		});

		if (user) {
			user.comparePassword(password, (err, isMatch) => {
				console.log(err, password, isMatch, "isMatch")
				if(error) {
					return res.status(500).json({
						success: false,
						message: "Error",
						system_error: error
					})
				}

				if (isMatch) {

					user.last_login = new Date();
					user.save();

					var token = jwt.sign({
						id: user._id,
						email: user.email,
						username: user.username,
						customer_id: user?.customer_id,
						wallet_data: user?.wallet_data
					}, config.JWT_SECRET, { expiresIn: '1h' });
					res.header('Authorization', `Bearer ${token}`);
					res.cookie('token', token).status(200).json({
						success: true,
						message: "Successfully logined",
						token
					})

				} else {
					res.status(200).json({
						success: false,
						message: "Invalid Username/Password",
					})
				}
			});
		} else {
			res.status(200).json({
				success: false,
				message: "No user found",
			})
		}
	});
	
});

/* GET Current user profile */
router.get('/whoami', auth.isAuthenticated, (req, res) => {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.headers.authorization ||
		req.cookies.token;

	if (token) {
		let data = jwtdecode(token);
		res.status(200).json({
			success: true,
			message: "Successfully get user name",
			result: data?.username
		});
	} else {
		res.status(401).json({
			success: false,
			message: "You are not logged in",
		})
	}
})

/* GET Logout */
router.get('/logout', auth.isAuthenticated, (req, res) => {
	if (token) {
		res.status(200).json({
			success: true,
			message: "Successfully logout",
		});
	} else {
		res.status(401).json({
			success: false,
			message: "Server Error",
		})
	}
})

/* POST forgot_password */
router.post('/forgot_password', (req, res) => {
	const { mail } = req.body;
	
	User.findOne({
		email: mail
	}, (error, user) => {
		if(error) {
			return res.status(500).json({
				success: false,
				message: "Server Error"
			})
		}
		if(user){
			/* email sending */
			return res.status(200).json({
				success: true,
				message: "Successfully sent",
			})
		}else {
			res.status(500).json({
				success: false,
				message: "Empty User"
			})
		}
	})	
});

/* POST update user info */
router.post('/:username',  auth.isAuthenticated, (req, res) => {
	res.status(200).json({
		success: true,
		data: req.params.username,
		message: "Successfully updated",
	});
});

/* GET get detail according to username */
router.get('/:username',  auth.isAuthenticated, (req, res) => {
	res.status(200).json({
		success: true,
		data: req.params.username,
		message: "Successfully updated",
	});
})

module.exports = router;