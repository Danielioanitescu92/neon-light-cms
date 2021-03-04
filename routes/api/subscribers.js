const express = require('express');
const router = express.Router();
require('dotenv').config();
const crypto = require('crypto');

// Transporter Auth Data
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const port = process.env.PORT || 3000;

// Item Model
const Subscriber = require('../../models/Subscriber');

// Nodemailer
const sgMail = require('@sendgrid/mail');

// @route GET api/subscribers/allSubscribers
// @desc Get all subscribers
// @access Public
router.get('/allSubscribers', (req, res) => {
    Subscriber.find()
    .sort({ register_date: -1 })
    .select('-ToDeletePasswordToken', '-ToDeletePasswordExpires')
    .then(subs => res.status(200).json(subs))
});

// @route GET api/subscribers/allsubs
// @desc Get all subscribers count
// @access Public
router.get('/allsubs/:mytime', (req, res) => {
    console.log("1 mytime: ", req.params.mytime)
    let total = 0
    let choosenTime

    var nowTime = Math.round(new Date().getTime() / 1000);
    var timeDay = nowTime - (24 * 3600);
    var timeWeek = nowTime - (7 * 24 * 3600);
    var timeMonth = nowTime - (30 * 24 * 3600);
    var timeYear = nowTime - (365 * 24 * 3600);

    if(req.params.mytime) {
        if(req.params.mytime === 'day') {
            choosenTime = timeDay
        } else if(req.params.mytime === 'week') {
            choosenTime = timeWeek
        } else if(req.params.mytime === 'month') {
            choosenTime = timeMonth
        } else if(req.params.mytime === 'year') {
            choosenTime = timeYear
        }
    }
    
    Subscriber.find()
    .then(subs => {
        console.log("2 subs exist; choosenTime: ", choosenTime)
        subs.map(sub => {
            console.log("3 map each sub: ", sub._id)
            if(Math.round(sub.register_date / 1000) > choosenTime) {
                console.log("4 (sub.date) included in (choosenTime): ", Math.round(sub.register_date / 1000), choosenTime)
                total = total + 1
            }
        })
    })
    .then(() => {
        console.log("5 total subs chosen: ", total)
        res.status(200).json(total)
    })
});

// @route GET api/subscribers/...
// @desc Get specific subscribers
// @access Public
router.get('/', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/page/:page', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/sort/:sort', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/page/:page', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/sort/:sort', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/page/:page/sort/:sort', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/page/:page/sort/:sort', paginatedResults(Subscriber), (req, res) => {
    res.json(res.paginatedResults)
});

function paginatedResults(model) {
    return async (req, res, next) => {

        const search = req.params.search || null
        const page = parseInt(req.params.page) || 1
        const sort = req.params.sort || null
        const limit = 1

        const startIndex = (page - 1) * limit
        const endIndex = page * limit    

        const mainModelLength = await model
        .find(
            search ?
                { email: { $regex: search, $options: "i" } }
            : null
        ).countDocuments().exec()

        const results = {}

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
                        { email: { $regex: search, $options: "i" } }
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
                .select('-ToDeletePasswordToken -ToDeletePasswordExpires')
                .exec()

            res.paginatedResults = results
            
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

 // package.json from client, change proxy to "http://127.0.0.1:5000/" and  add on next row "secure": false

// @route DELETE api/subscribers/:id
// @desc delete subscriber
// @access Private
router.delete('/:id', (req, res) => {
    Subscriber.findOne({ email: req.params.id })
    .then(sub => {
        if(sub !== null) {
            sub.remove().then(() => res.status(200).json({ msg: 'subscriber deleted' }))
        } else {
            res.status(404).json({ msg: 'no user exists in db to update' });
        }
    })
    .catch(err => res.status(404).json({ success: false }))
});

// @route POST api/subscribers
// @desc POST new email for each sub on new post
// @access Private
router.post('/', (req, res) => {
    const { picUrl, title, subtitle, text, by } = req.body;

    const encodedTitle = encodeURIComponent(title).replace(' ','%20')

    Subscriber.find()
    .then(subs => {
        subs.map(sub => {

            const token = crypto.randomBytes(20).toString('hex');
            sub.ToDeletePasswordToken = token,
            sub.ToDeletePasswordExpires = Date.now() + 3600000
            sub.save()
            
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: `${sub.email}`,
                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                fromname: `Daniel, `,
                subject: `${title}`,
                text:
                    `<img src={${picUrl}} alt={${title}} width="50" height="50"></img>` +
                    `By ` + `${by} <br>` +
                    `${subtitle} <br>` +
                    `${text} <br>` +
                    `Check full article: <br>` +
                    `https://neon-light-generation.herokuapp.com/${encodedTitle} <br>` +
                    // `${href}/${encodedTitle} \n\n` +
                    'We value our clients decisions, so feel free to unsubscribe if you want by clicking the following link. <br>' + 
                    'Due to safety measurements, the provided link will only be available one hour from now on: <br>' +
                    `https://neon-light-generation.herokuapp.com/unsubscribe/${token}`,
                html: 
                    `<img src={${picUrl}} alt={${title}} width="50" height="50"></img>` +
                    `By ` + `${by} <br>` +
                    `By ` + `${by} <br>` +
                    `${subtitle} <br>` +
                    `${text} <br>` +
                    `Check full article: <br>` +
                    `<strong>https://neon-light-generation.herokuapp.com/${encodedTitle}</strong> <br>` +
                    // `${href}/${encodedTitle} \n\n` +
                    'We value our clients decisions, so feel free to unsubscribe if you want by clicking the following link. <br>' + 
                    'Due to safety measurements, the provided link will only be available one hour from now on: <br>' +
                    `<strong>https://neon-light-generation.herokuapp.com/unsubscribe/${token}</strong>`,
            }
            sgMail
            .send(msg)
            // .then(() => {
            //     res.status(200).json({ msg: 'News email sent' })
            // })
            // .catch((error) => {
            //     res.status(400).json({ msg: 'There was an error' });
            // })
            
        })
    })
    .catch(err => {
        res.status(400).json({ msg: "Subscribe not possible" });
    });
});

// @route POST api/subscribers/sendNewsletter
// @desc SEND send Campagne message to all subs
// @access Public
router.post('/sendNewsletter', (req, res) => {
    const { subject, text } = req.body;

    if(!subject || !text) {
        return res.status(400).json({ msg: "Plase enter all fields" });
    }

    Subscriber.find()
    .then(subs => {
        subs.map(sub => {    

            const token = crypto.randomBytes(20).toString('hex');
            sub.ToDeletePasswordToken = token,
            sub.ToDeletePasswordExpires = Date.now() + 3600000
            sub.save()
        
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: `${sub.email}`,
                from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                fromname: `Daniel, `,
                subject: `${subject}`,
                text: `${text}` +
                    // `${href}/${encodedTitle} \n\n` +
                    'We value our clients decisions, so feel free to unsubscribe if you want by clicking the following link. \n\n' + 
                    'Due to safety measurements, the provided link will only be available one hour from now on: \n\n' +
                    `http://${req.hostname}:${port}/unsubscribe/${token}`,
                html: 
                    `${text} \n\n` +
                    // `${href}/${encodedTitle} \n\n` +
                    'We value our clients decisions, so feel free to unsubscribe if you want by clicking the following link. \n\n' + 
                    'Due to safety measurements, the provided link will only be available one hour from now on: \n\n' +
                    `<strong>http://${req.hostname}:${port}/unsubscribe/${token}</strong>`,
            }
            sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ msg: 'Campagne email sent' })
            })
            .catch((error) => {
                res.status(400).json({ msg: 'There was an error' });
            })
        
        })
    })
    .catch(err => res.status(400).json({ msg: "Subscriber not found" }));
    
});

module.exports = router;