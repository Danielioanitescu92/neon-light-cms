const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const crypto = require('crypto');

// Transporter Auth Data
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const port = process.env.PORT || 3000;

// Nodemailer
const sgMail = require('@sendgrid/mail');

// User Model
const User = require('../../models/User');

// @route GET api/users/allUsers
// @desc Get all users
// @access Public
router.get('/allUsers', (req, res) => {
    User.find()
    .sort({ register_date: -1 })
    .select('-password -resetPasswordToken -resetPasswordExpires')
    .then(users => res.status(200).json(users))
});

// @route GET api/users/getThisUser/:name
// @desc Get specific user
// @access Public
router.get('/getThisUser/:name', (req, res) => {
    User.find({ name: req.params.name})
    .select('-password')
    .then(users => res.status(200).json(users))
});

// @route GET api/users/...
// @desc Get specific users...
// @access Public
router.get('/', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/page/:page', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/role/:role', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/page/:page', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/role/:role', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/page/:page/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/role/:role/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/role/:role/page/:page', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/role/:role/page/:page/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/page/:page/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/role/:role/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/role/:role/page/:page', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});
router.get('/search/:search/role/:role/page/:page/sort/:sort', filteredUsers(User), (req, res) => {
    res.json(res.filteredUsers)
});

function filteredUsers(model) {
    return async (req, res, next) => {

        const search = req.params.search || null
        let role =  null
        const page = parseInt(req.params.page) || 1
        const sort = req.params.sort || null
        const limit = 1

        if(req.params.role) {
            if(req.params.role.includes(",")) {
                role = req.params.role.split(",")
            } else {
                role = req.params.role
            }
        } else {
            role = null
        }

        const startIndex = (page - 1) * limit
        const endIndex = page * limit     

        const results = {}  

        const mainModelLength = await model
        .find(
            search ?
                role ? 
                    { $or: [
                        { role: { "$in": role }, name : { $regex: search, $options: "i" } },
                        { role: { "$in": role }, email : { $regex: search, $options: "i" } },
                        { role: { "$in": role }, role : { $regex: search, $options: "i" } }
                    ]}
                : { $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { role: { $regex: search, $options: "i" } }
                ]}
            : role ?
                { role: { "$in": role } }
            : null
        ).countDocuments().exec()

        if (endIndex < mainModelLength) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        } else if(endIndex > mainModelLength) {
            results.next = null
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model
                .find(
                    search ?
                        role ? 
                            { $or: [
                                { role: { "$in": role }, name : { $regex: search, $options: "i" } },
                                { role: { "$in": role }, email : { $regex: search, $options: "i" } },
                                { role: { "$in": role }, role : { $regex: search, $options: "i" } }
                            ]}
                        : { $or: [
                            { name: { $regex: search, $options: "i" } },
                            { email: { $regex: search, $options: "i" } },
                            { role: { $regex: search, $options: "i" } }
                        ]}
                    : role ?
                        { role: { "$in": role } }
                    : null
                )
                .sort(
                    sort ?
                        sort === 'descending' ? { register_date: -1 }
                        : sort === 'ascending' ? { register_date: 1 }
                        : { register_date: -1 }  // register_date -1 e de la nou la vechi
                    : { register_date: -1 }
                )
                .limit(limit)
                .skip(startIndex)
                .exec()

            res.filteredUsers = results
            
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

// @route UPDATE api/users/editprofile/:id
// @desc Update user
// @access Private
router.post('/editprofile/:id', (req, res) => {
    let editedProfile = {
        avatar: req.body.avatar,
        name: req.body.name,
        aboutme: req.body.aboutme,
        email: req.body.email,
        role: req.body.role,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        youtube: req.body.youtube
    };
    User.findByIdAndUpdate(req.params.id, editedProfile, {new: true}, (err, user) => {
        if(!user)
            res.status(404).json({ msg: "user is not found" });
        else
            user.save()
            res.status(200).send(user)
            // .then(user => res.json({ msg: 'user updated!' }))
            // .catch(() => res.status(400).send("Update not possible"));
        })
        .catch(err => res.status(400).json({ msg: "Update not possible" }));
})

// @route UPDATE api/users/changepass/:id
// @desc Change password
// @access Private
router.post('/changepass/:id', (req, res) => {
    let changedPass = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    };
    User.findByIdAndUpdate(req.params.id, changedPass, {new: true}, (err, user) => {
        if(!user) {
            res.status(404).json({ msg: "user is not found" });
        } else
            bcrypt.compare(changedPass.oldPassword, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                } else if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(changedPass.newPassword, salt, (err, hash) => {
                            if(err) throw err;
                            user.password = hash;
                            user.save().then(user => res.json({
                                    _id: user._id ,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    register_date: user.register_date,
                                    aboutme: user.aboutme,
                                    avatar: user.avatar,
                                    facebook: user.facebook,
                                    instagram: user.instagram,
                                    twitter: user.twitter,
                                    youtube: user.youtube
                                }
                            ));
                        })
                    });

                } else if (!isMatch) {
                    console.log("incorrect password")
                }
            })
    })
})

// @route DELETE api/users/:id
// @desc Delete user
// @access Private
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        console.log("Del User ", req.params.id)
        user.remove().then(() => res.status(200).json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }))
});

// @route POST api/users
// @desc Register new User
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password || !role) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: "User already exists" });

        const token = crypto.randomBytes(20).toString('hex');
        const newUser = new User({
            name,
            email,
            password,
            role,
            resetPasswordToken: token
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => res.json({
                        _id: user._id ,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        register_date: user.register_date,
                        aboutme: user.aboutme,
                        avatar: user.avatar,
                        facebook: user.facebook,
                        instagram: user.instagram,
                        twitter: user.twitter,
                        youtube: user.youtube,
                        resetPasswordToken: user.resetPasswordToken
                    }
                ));
            })
        });



        sgMail.setApiKey(SENDGRID_API_KEY)
        const msg = {
            to: `${email}`,
            from: `${EMAIL_ADDRESS}`, // the VERIFIED email
            fromname: `Admin`,
            subject: `Welcome, ${name}`,
            text:
                'Your account has been created. \n\n' +
                'To confirm it, please click the link bellow: \n\n' +
                `http://${req.hostname}:${port}/confirmAccount/${token} \n\n`,
                // `${href}/confirmAccount/${token} \n\n`
            html:
                'Your account has been created. \n\n' +
                'To confirm it, please click the link bellow: \n\n' +
                `<strong>http://${req.hostname}:${port}/confirmAccount/${token}</strong> \n\n`
                // `${href}/confirmAccount/${token} \n\n`,
        }
        sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({ msg: 'Your email has been sent' })
        })
        .catch((error) => {
            res.status(400).json({ msg: 'There was an error' });
        })

    })
    .catch(err => {
        res.status(400).json({ msg: "Register not possible" });
    });
});

// // @route GET api/users/confirmAccount
// // @desc Get resetPasswordToken and erase for confirmation
// // @access Private
router.get('/confirmAccount/:token', (req, res) => {
    User.findOne({
        resetPasswordToken: req.params.token
    })
    .then(user => {
        if(!user) {
            res.json({ msg: 'Password reset link is invalid or has expired. Please try again.' })
        } else {
            res.status(200).json({ msg: 'Your account is active. You can now login.' });
            user.resetPasswordToken = null;
            user.save();
        }
    })
});

// @route POST api/users/contactdev
// @desc SEND Email from user to developer
// @access Public
router.post('/contactdev', (req, res) => {
    const { email, name, subject, text } = req.body;
    console.log("1: ", req.body)

    if(!email || !name || !subject || !text) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    User.findOne({ email })
    .then(user => {
        if(user) {
            console.log("2")

            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: `daniel123imd@gmail.com`,
                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                fromname: `${name}`,
                subject: `${subject}`,
                text: `From: ${email} \n\n` + `Text: ${text}`,
                html: `From: ${email} \n\n` + `Text: <strong>${text}</strong>`
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log("3")
                res.status(200).json({ msg: 'Your email has been sent' })
            })
            .catch((error) => {
                console.log("4")
                res.status(400).json({ msg: 'There was an error' });
            })
        
        } else {
            console.log("5")
            res.status(400).json({ msg: "User's email not found" });
        }

    })
    .catch(err => {
        console.log("6")
        res.status(400).json({ msg: "Contact dev not possible" });
    });
});

// @route POST api/users/contactadmin
// @desc SEND Email from basic to admin
// @access Public, only for basics
router.post('/contactadmin', (req, res) => {
    const { email, name, subject, text } = req.body;

    if(!email || !name || !subject || !text) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    User.findOne({ role: 'admin' })
    .then(user => {
        if(user) {

            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: `${user.email}`,
                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                fromname: `${name}`,
                subject: `${subject}`,
                text: `From: ${email} \n\n` + `Text: ${text}`,
                html: `From: ${email} \n\n` + `Text: <strong>${text}</strong>`
            }
            sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ msg: 'Your email has been sent' })
            })
            .catch((error) => {
                res.status(400).json({ msg: 'There was an error' });
            })
        
        } else {
            res.status(400).json({ msg: "User's email not found exists" });
        }

    })
    .catch(err => {
        res.status(400).json({ msg: "Contact admin not possible" });
    });
});

// @route POST api/users/sendMessage
// @desc Send message to all users
// @access Public
router.post('/sendMessage', (req, res) => {
    const { subject, text } = req.body;

    if(!subject || !text) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    User.find()
    .then(users => {
        users.map(user => {
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: `${user.email}`,
                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                fromname: `Admin`,
                subject: `${subject}`,
                text: `${text}`,
                html: `<strong>${text}</strong>`
            }
            sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ msg: 'Your email has been sent' })
            })
            .catch((error) => {
                res.status(400).json({ msg: 'There was an error' });
            })
        })
    })
    .catch(err => res.status(400).json({ msg: "Users not found" }));
    
});

module.exports = router;