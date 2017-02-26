var express = require('express');

var {mongoose} = require('./config/mongoose');
var {User} = require('./models/user');

module.exports = function(app) {

	app.get('/chat', (req, res) => {
		res.redirect('/');
	});
	
	app.get('/login', (req, res) => {
		res.redirect('/');
	});
	
	app.get('/lobby', (req, res) => {
		res.redirect('/');
	});
	
	//POST Register add error handlers
	app.post('/users', (req, res) => {

		//create new account and hash password

		User.findOne({ 'email': req.body.email}).then((user) => {
				if(user) {
					res.status(400).send(new Error('Email already in use'));
				} else {
					var newUser = new User();

					newUser.email = req.body.email
					newUser.password = newUser.generateHash(req.body.password);

					newUser.save().then((user) => {
						res.send(user)
					});
				}
		}); 
	});
	
	// POST Login add error handlers
	app.post('/users/login', (req, res) => {
			

		User.findOne({ 'email': req.body.email }).then((user) => {
			if(!user) {
				res.status(400).send(new Error('Login Failed'));
			} else if (!user.validPassword(req.body.password)) {
				res.status(400).send(new Error('Login Failed'));
			} else {
				res.send(user)
			}

		});
	});

}
