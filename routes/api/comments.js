const express = require('express');
const router = express.Router();

// Models
const Comment = require('../../models/Comment');
const Item = require('../../models/Item');

// @route GET api/comments
// @desc Get all comments
// @access Public
router.get('/', (req, res) => {
    Comment.find()
    .sort({ date: -1 })
    .then(comments => res.status(200).json(comments))
});

// @route GET api/comments/getThisComms/:id
// @desc Get specific comments for specific page
// @access Public
router.get('/getThisComms/:id', (req, res) => {
    Comment.find({ forWich: req.params.id })
    .sort({ date: -1 })
    .then(comments => {
        if (!comments) {
            return res.status(400).json({ commsnotfound: "No comms found" })
        }
        res.status(200).json(comments)
    })
});

// @route POST api/comments
// @desc Create comment
// @access Public
router.post('/', (req, res) => { 
    Item.findById(req.body.forWich)
    .then(item => {
        item.commCount = item.commCount + 1
        item.save()
    })

    const newComment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        forWich: req.body.forWich
    });

    newComment.save().then(comment => res.status(200).json(comment));
});

// @route DELETE api/comments/:id
// @desc Delete comment
// @access Private
router.delete('/:id', (req, res) => {
    Comment.findById(req.params.id)
    .then(comm => {
        if(comm) {
            comm.remove()
        }
    })
    .then(() => {
        res.status(200).json({ success: true })
    })
    .catch(err => res.status(404).json({ success: false }))
});

// @route DELETE api/cmoments/onPostDel/:id (item._id)
// @desc Delete reply
// @access Private
router.delete('/onPostDel/:id', (req, res) => {
    Comment.find({ forWich: req.params.id })
    .then(comm => {
        if(comm.length > 0) {
            comm.map(c => {
                // res.status(200).json(comm)
                c.remove()
            })
        }
    })
    .catch(err => {
        res.status(404).json({ success: false })
    })
});

// @route POST api/comments/like
// @desc Like comment
// @access Public
router.post('/like', (req, res) => {
    const { commentId, userId } = req.body;
    Comment.findById(commentId)
    .then(comment => {
        comment.likes.unshift({ commentId, userId });
        comment.save().then(comment => res.status(200).json(comment));
    })
    .catch(err => {
        res.status(404).json({ commentnotfound: "No comment found" })
    });
});

// @route POST api/comments/unlike
// @desc Unlike comment
// @access Public
router.post('/unlike', (req, res) => {
    const { commentId, userId } = req.body;
    Comment.update({ _id : commentId },
        { $pull: { likes:  { userId: userId } } }, (err) => {
            if (err) {
                return res.status(404).json({ message: 'Error' });
            }
            return res.status(200).json({ message: 'success' });
        }
    );
});

module.exports = router;