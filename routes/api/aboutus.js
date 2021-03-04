const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const About = require('../../models/About');

// @route GET api/aboutus
// @desc Get About
// @access Public
router.get('/', (req, res) => {
    About.find()
    .then(about => res.status(200).json(about))
});

// @route UPDATE api/aboutus/editabout/:id
// @desc Update About
// @access Private
router.post('/editabout/:id', (req, res) => {
    let editedAbout = { text: req.body.text };
    // maybe make this just FIND() or FINDONE({}), without id:
    About.findByIdAndUpdate(req.params.id, editedAbout, {new: true}, (err, about) => {
        if(!about)
            res.status(404).json({ msg: "about is not found" });
        else
            res.status(200).send(about)
            about.save()
    })
});

module.exports = router;