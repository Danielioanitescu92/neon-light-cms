const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const TermsCon = require('../../models/TermsCon');

// @route GET api/termscons
// @desc Get Private Policies
// @access Public
router.get('/', (req, res) => {
    TermsCon.find()
    .then(tc => res.json(tc))
});

// @route UPDATE api/termscons/edittc/:id
// @desc Update termscons
// @access Private
router.post('/edittc/:id', (req, res) => {
    let editedTC = { text: req.body.text };
    TermsCon.findByIdAndUpdate(req.params.id, editedTC, {new: true}, (err, tc) => {
        if(!tc)
            res.status(404).json({ msg: "terms and conditions is not found" });
        else
            res.send(tc)
            tc.save()
            // .then(tc => {
            //     res.json('terms and conditions updated!');
            // })
            // .catch(err => {
            //     res.status(400).send("Update not possible");
            // });
    })
});

module.exports = router;