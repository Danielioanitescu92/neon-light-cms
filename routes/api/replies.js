const express = require('express');
const router = express.Router();

// Models
const Reply = require('../../models/Reply');
const Item = require('../../models/Item');

// @route GET api/replies
// @desc Get all replies
// @access Public
router.get('/', (req, res) => {
    Reply.find()
    .sort({ date: +1 })
    .then(replies => res.status(200).json(replies))
});

// @route GET api/replies/getThisReps/:id
// @desc Get specific replies
// @access Public
router.get('/getThisReps/:id', (req, res) => {
    Reply.find({ forWich: req.params.id })
    .sort({ date: +1 })
    .then(replies => res.status(200).json(replies))
});

// @route POST api/replies
// @desc Create reply
// @access Public
router.post('/', (req, res) => {
    Item.findById(req.body.forWich)
    .then(item => {
        item.commCount = item.commCount + 1
        item.save()
    })

    const newReply = new Reply({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        forWich: req.body.forWich,
        parentComm: req.body.parentComm
    });

    newReply.save().then(reply => res.status(200).json(reply));
});

// @route DELETE api/replies/:id (rep._id)
// @desc Delete reply
// @access Private
router.delete('/:id', (req, res) => {
    console.log("rep del 1")
    Reply.findById(req.params.id)
    .then(rep => {
        console.log("rep del 2")
        rep.remove()
    })
    .then(() => {
        console.log("rep del 3")
        res.status(200).json({ success: true })
    })
    .catch(err => res.status(404).json({ success: false }))
});

// @route DELETE api/replies/onPostDel/:id (item._id)
// @desc Delete reply
// @access Private
router.delete('/onPostDel/:id', (req, res) => {
    console.log("dellRep 1")
    Reply.find({ forWich: req.params.id })
    .then(rep => {
        if(rep.length > 0) {
            rep. map(r => {
                console.log("dellRep 2, rep: ", r._id)
                // res.status(200).json(comm)
                r.remove()
            })
        }
    })
    .catch(err => res.status(404).json({ success: false }))
});

// @route POST api/replies/like
// @desc Like reply
// @access Public
router.post('/like', (req, res) => {
    const { replyId, userId } = req.body;
    Reply.findById(replyId)
    .then(reply => {
        reply.likes.unshift({ replyId, userId });
        reply.save().then(reply => res.status(200).json(reply));
    })
    .catch(err => {
        res.status(404).json({ replynotfound: "No reply found" })
    });
});

// @route POST api/replies/unlike
// @desc Unlike reply
// @access Public
router.post('/unlike', (req, res) => {
    const { replyId, userId } = req.body;

    Reply.update({ _id : replyId },
        { $pull: { likes:  { userId: userId } } }, (err) => {
            if (err) {
                return res.status(404).json({ message: 'Error' });
            }
            return res.status(200).json({ message: 'success' });
        }
    );
});

module.exports = router;