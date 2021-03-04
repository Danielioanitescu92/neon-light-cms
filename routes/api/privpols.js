const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const PrivPol = require('../../models/PrivPol');

// @route GET api/privpols
// @desc Get Private Policies
// @access Public
router.get('/', (req, res) => {
    PrivPol.find()
    .then(pp => res.status(200).json(pp))
});

// @route UPDATE api/privpols/editpp/:id
// @desc Update privPols
// @access Private
router.post('/editpp/:id', (req, res) => {
    let editedPP = { text: req.body.text };
    PrivPol.findByIdAndUpdate(req.params.id, editedPP, {new: true}, (err, pp) => {
        if(!pp)
            res.status(404).json({ msg: "privacy policies is not found" });
        else
            res.status(200).send(pp)
            pp.save()
            // .then(pp => {
            //     res.json('privacy policies updated!');
            // })
            // .catch(err => {
            //     res.status(400).send("Update not possible");
            // });
    })
});

module.exports = router;