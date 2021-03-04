const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const crypto = require('crypto');

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const port = process.env.PORT || 3000;

const User = require('../../models/User');

// Nodemailer
const sgMail = require('@sendgrid/mail');

// @route POST api/auth
// @desc Auth user(Login)
// @access Public
router.post('/', (req, res) => {
    console.log("1 api req made")
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    User.findOne({ email })
    .then(user => {
        console.log("2 trying to fin user")
        if(!user) {
            return res.status(400).json({ msg: "User does not exists" })
        } else if(user.resetPasswordToken = null || !user.resetPasswordToken) {
            console.log("3 user found")
            if(user.safetyLock > Date.now()) {
                console.log("TOO MANY ATTEMPTS!!!")
                user.resetPasswordToken = null
                user.save()
                return res.status(400).json({ msg: "There were 3 failed attempts resulting in blocking user. Please come back in 24 hours and try logging in again!" });
            } else {
                console.log("4 no more than 3 attempts")
                bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) {
                        console.log("5 pass doesn't match")
                        user.loginAttempts = user.loginAttempts +1
                        if(user.loginAttempts === 3) {
                            console.log("6 now you made 3 ATTEMPTS!!!")
                            user.safetyLock = Date.now() + 3600000;
                            user.loginAttempts = 0;
                            user.save()
            
                            sgMail.setApiKey(SENDGRID_API_KEY)
                            const msg = {
                                to: `${user.email}`,
                                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                                fromname: `Admin`,
                                subject: '3 login attempts reached!',
                                text:
                                    'Trying to login 3 times with invalid credentials will result in a 24 hours user block. <br>' +
                                    'If it was you, please come back and tryy again in 24 hours. <br>' +
                                    `If it wasn't you, immediately change your password and contact our team at ${EMAIL_ADDRESS} !`,
                                html:
                                    'Trying to login 3 times with invalid credentials will result in a 24 hours user block. <br>' +
                                    'If it was you, please come back and tryy again in 24 hours. <br>' +
                                    `If it wasn't you, immediately change your password and contact our team at <strong>${EMAIL_ADDRESS}</strong> !`
                            }
                            sgMail
                            .send(msg)
                            .then(() => {
                                console.log("7 email sent")
                                return res.status(400).json({ msg: "There were 3 failed attempts resulting in blocking user. Please come back in 24 hours and try logging in again!" });
                            })
                            .catch((error) => {
                                console.log("7 error mailing...")
                                res.status(400).json({ msg: 'There was an error sending the attempts email...' });
                            })

                            user.resetPasswordToken = null
                            user.save()

                        } else {
                            console.log("6 loginAttempts +1")
                            user.resetPasswordToken = null
                            user.save()
                            return res.status(400).json({ msg: "Invalid credentials" });
                        }
                    } else {
                        console.log("5 good password and email ;)")
                        if(user.loginAttempts > 0) {
                            console.log("6 reset loginAttempts to 0")
                            user.loginAttempts = 0
                            user.save()
                        }
                        if(user.safetyLock) {
                            console.log("7 reset safetyLock to null")
                            user.safetyLock = null
                            user.save()
                        }
                        user.resetPasswordToken = null
                        user.save()
                        jwt.sign(
                            { _id: user._id },
                            process.env.jwtSecret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        _id: user._id ,
                                        name: user.name,
                                        email: user.email,
                                        role: user.role,
                                        register_date: user.register_date,
                                        aboutme: user.aboutme,
                                        avatar: user.avatar,
                                        prof: user.prof,
                                        facebook: user.facebook,
                                        instagram: user.instagram,
                                        twitter: user.twitter,
                                        youtube: user.youtube
                                    }
                                })
                            }
                        )
                    }
                })
            }
            
        }
    })
});

// @route POST api/auth/forgotPass
// @desc send Email with link when forgot password
// @access Public
router.post('/forgotPass', (req, res) => {
    const email = req.body.email;

    if(!email) {
        return res.status(400).json({ msg: 'email required' })
    }
    User.findOne({ email })
    .then(user => {
        if(!user) {
            return res.status(400).json({ msg: 'email not in db' });
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = token,
            user.resetPasswordExpires = Date.now() + 3600000
            user.save()
            
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: `${user.email}`,
                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                fromname: `Admin, `,
                subject: 'Link to Reset Password',
                text:
                    'You are receiving this email because you have requested your password. \n\n' +
                    'Please click the following link to complete the process whitin one hour of receiving it: \n\n' +
                    `http://${req.hostname}:${port}/resetPass/${token} \n\n` +
                    // `${href}/resetPass/${token} \n\n` +
                    'If you did not requested a password change, please ignore this email',
                html:
                    'You are receiving this email because you have requested your password. \n\n' +
                    'Please click the following link to complete the process whitin one hour of receiving it: \n\n' +
                    `<strong>http://${req.hostname}:${port}/resetPass/${token}</strong> \n\n` +
                    // `${href}/resetPass/${token} \n\n` +
                    'If you did not requested a password change, please ignore this email'
            }
            sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ msg: 'Recovery email sent' })
            })
            .catch((error) => {
                res.status(400).json({ msg: 'There was an error' });
            })
            
        }
    });
});

// @route GET api/auth/resetPass/:token
// @desc Get user name(reset pass)
// @access Private
router.get('/resetPass/:token', (req, res, next) => {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    })
    .then(user => {
        if(!user) {
            res.status(400).json({ msg: 'password reset link is invalid or has expired' });
        } else {
            return res.status(200).json({
                username: user.name,
                msg: 'password reset link a-ok'
            })
        }
    })
});

// @route PUT api/auth/updatePasswordViaEmail
// @desc Update user password
// @access Private
router.put('/updatePasswordViaEmail', (req, res, next) => {
    const { username, password, confirmPassword } = req.body;

    if(!username || !password || !confirmPassword) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    User.findOne({ name: username })
    .then(user => {
        if(user) {            
            if(password !== confirmPassword) {
                return res.status(400).json({ msg: "Invalid credentials" })
            }
            bcrypt.hash(password, 12)
            .then(hashedPassword => {
                user.password = hashedPassword,
                user.resetPasswordToken = null,
                user.resetPasswordExpires = null
                user.save().then(() => {
                    res.json({ msg: 'password updated' })
                })
            })
        } else {
            res.status(404).json({ msg: 'no user exists in db to update' });
        }
    })
});

// @route GET api/auth/user
// @desc Get user data(after login)
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user._id)
    .select('-password -safetyLock -loginAttempts')
    .then(user => res.json(user));
});

module.exports = router;