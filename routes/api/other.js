const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Other = require('../../models/Other');

// @route GET api/other
// @desc Get all unique visitors
// @access Private
router.get('/', (req, res) => {
    console.log("Yo 11")

    Other.find()
    .then(item => {
        console.log("Yo 22: ", item)
    // .then(() => {
    //     console.log(theUniques)
    //     res.status(200).json({uniques: theUniques})
    // })
    })
});

// @route POST api/other
// @desc Create unique visitor
// @access Private
router.post('/', (req, res) => {
    const newOther = new Other({
        way: 'fbclid',
        date: Date.now(),
        screenSize: 400,
        unique: 'unique'
    });

    console.log("UNQ CREATED 1")
    
    newOther.save()
    .then(item => {
        console.log("UNQ CREATED 2")
        res.status(200).json(item)
    })
    .catch(err => res.status(404).json({ error: "Cannot create unq: ", err }));
});

// @route GET api/other/getUniques
// @desc Get unique visitors
// @access Private
router.get('/getUniques/:date', (req, res) => {
    console.log("Yo 1")
    const whatTime = req.params.date
    let theUniques = 0

    let choosenTime
    const nowTime = new Date();
    const day = nowTime.getDate();
    const month = nowTime.getMonth();
    const year = nowTime.getFullYear();
    const timeWeek = new Date(year, month, day - 6)
    const timeMonth = new Date(year, month - 1, day)
    const timeYear = new Date(year - 1, month, day)
    const timeAll = new Date(year - 10, month, day)

    if(whatTime) {
        if(whatTime == 'week') {
            choosenTime = timeWeek
        } else if(whatTime == 'month') {
            choosenTime = timeMonth
        } else if(whatTime == 'year') {
            choosenTime = timeYear
        } else if(whatTime == 'all') {
            choosenTime = timeAll
        }
    }

    const addMyDays = (past, days) => {
        const nowTime = past;
        const day = nowTime.getDate();
        const month = nowTime.getMonth();
        const year = nowTime.getFullYear();
        const dat = new Date(year, month, day + days)
        return dat;
    }
 
    const getDates = (past, prezent) => {
        const dateArray = [];
        while (past < prezent) {
            dateArray.push(past)
            past = addMyDays(past, 1);
        }
        return dateArray;
    }
 
    const dateArray = getDates(choosenTime, nowTime);

    Other.find()
    .then(item => {
        console.log("Yo 2: ", item)

        dateArray.map(dar => {
            console.log("Yo 3")
            const dayD = dar.getDate();
            const monthD = dar.getMonth();
            const yearD = dar.getFullYear();

            const dayV = item.date.getDate();
            const monthV = item.date.getMonth();
            const yearV = item.date.getFullYear();

            if(`${yearD}-${monthD}-${dayD}` === `${yearV}-${monthV}-${dayV}`) {
                console.log("Yo 4 organic date equal")
                if(item.unique === 'unique') {
                    console.log("Yo 5 organic theUniques + 1")
                    theUniques = theUniques + 1
                }
            }
        })
    })
    .then(() => {
        console.log(theUniques)
        res.status(200).json({uniques: theUniques})
    })
});

module.exports = router;