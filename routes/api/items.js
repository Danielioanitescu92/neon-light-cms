const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');
const Comment = require('../../models/Comment');
const Reply = require('../../models/Reply');
const User = require('../../models/User');
const Subscriber = require('../../models/Subscriber');
const Other = require('../../models/Other');

// @route GET api/items/...
// @desc Get specific items
// @access Public
router.get('/', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/page/:page', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/author/:author', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/page/:page', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/author/:author', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/page/:page/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/author/:author/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/author/:author/page/:page', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/author/:author/page/:page/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/page/:page/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/author/:author/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/author/:author/page/:page', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});
router.get('/search/:search/author/:author/page/:page/sort/:sort', paginatedResults(Item), (req, res) => {
    res.json(res.paginatedResults)
});

function paginatedResults(model) {
    return async (req, res, next) => {

        const search = req.params.search || null
        const page = parseInt(req.params.page) || 1
        const sort = req.params.sort || null
        let author =  null

        if(req.params.author) {
            if(req.params.author.includes(",")) {
                author = req.params.author.split(",")
            } else {
                author = req.params.author
            }
        } else {
            author = null
        }

        const limit = 2
        const results = {}
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const MainModelCount = await model
        .find(
            search ?
                author ? 
                    { $or: [
                        { by: { "$in": author }, title : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, by : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, subtitle : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, text : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, "tags.tag": { $regex: search, $options: "i" } }
                    ]}
                : { $or: [
                    { title: { $regex: search, $options: "i" } },
                    { by: { $regex: search, $options: "i" } },
                    { subtitle: { $regex: search, $options: "i" } },
                    { text: { $regex: search, $options: "i" } },
                    { "tags.tag": { $regex: search, $options: "i" } }
                ]}
            : author ?
                { by: { "$in": author } }
            : null
        ).countDocuments().exec()

        if (endIndex < MainModelCount) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        } else if(endIndex > MainModelCount) {
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
                        author ? 
                            { $or: [
                                { by: { "$in": author }, title : { $regex: search, $options: "i" } },
                                { by: { "$in": author }, by : { $regex: search, $options: "i" } },
                                { by: { "$in": author }, subtitle : { $regex: search, $options: "i" } },
                                { by: { "$in": author }, text : { $regex: search, $options: "i" } },
                                { by: { "$in": author }, "tags.tag": { $regex: search, $options: "i" } }
                            ]}
                        : { $or: [
                            { title: { $regex: search, $options: "i" } },
                            { by: { $regex: search, $options: "i" } },
                            { subtitle: { $regex: search, $options: "i" } },
                            { text: { $regex: search, $options: "i" } },
                            { "tags.tag": { $regex: search, $options: "i" } }
                        ]}
                    : author ?
                        { by: { "$in": author } }
                    : null
                )
                .sort(
                    sort ?
                        sort === 'descending' ? { date: -1 }
                        : sort === 'ascending' ? { date: 1 }
                        : sort === 'popular' ? { "views.total": -1 }
                        : { date: -1 }  // date -1 e de la nou la vechi
                    : { date: -1 }
                )
                .limit(limit)
                .skip(startIndex)
                .exec()

            res.paginatedResults = results
            
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

// @route GET api/items/forMe
// @desc Get specific items for My Account
// @access Public
router.get('/forMe/:name', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/page/:page', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search/page/:page', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/page/:page/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/page/:page', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/page/:page/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search/page/:page/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search/page/:page', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});
router.get('/forMe/:name/search/:search/page/:page/sort/:sort', paginatedResultsForMe(Item), (req, res) => {
    res.json(res.paginatedResultsForMe)
});

function paginatedResultsForMe(model) {
    return async (req, res, next) => {

        const search = req.params.search || null
        const page = parseInt(req.params.page) || 1
        const sort = req.params.sort || null
        author = req.params.name

        const limit = 2
        const results = {}
        const startIndex = (page - 1) * limit
        const endIndex = page * limit        

        const mainModelLength = await model
        .find(
            search ?
                author ? 
                    { $or: [
                        { by: { "$in": author }, title : { $regex: search, $options: "i" } },
                        { by: { "$in": author } },
                        { by: { "$in": author }, subtitle : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, text : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, "tags.tag": { $regex: search, $options: "i" } }
                    ]}
                : { $or: [
                    { title: { $regex: search, $options: "i" } },
                    { subtitle: { $regex: search, $options: "i" } },
                    { text: { $regex: search, $options: "i" } },
                    { "tags.tag": { $regex: search, $options: "i" } }
                ]}
            : author ?
                { by: { "$in": author } }
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
                        author ? 
                            { $or: [
                                { by: { "$in": author }, title : { $regex: search, $options: "i" } },
                                { by: { "$in": author } },
                                { by: { "$in": author }, subtitle : { $regex: search, $options: "i" } },
                                { by: { "$in": author }, text : { $regex: search, $options: "i" } },
                                { by: { "$in": author }, "tags.tag": { $regex: search, $options: "i" } }
                            ]}
                        : { $or: [
                            { title: { $regex: search, $options: "i" } },
                            { subtitle: { $regex: search, $options: "i" } },
                            { text: { $regex: search, $options: "i" } },
                            { "tags.tag": { $regex: search, $options: "i" } }
                        ]}
                    : author ?
                        { by: { "$in": author } }
                    : null
                )
                .sort(
                    sort ?
                        sort === 'descending' ? { date: -1 }
                        : sort === 'ascending' ? { date: 1 }
                        : sort === 'popular' ? { "views.total": -1 }
                        : { date: -1 }  // date -1 e de la nou la vechi
                    : { date: -1 }
                )
                .limit(limit)
                .skip(startIndex)
                .exec()

            res.paginatedResultsForMe = results
            
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

// @route GET api/items/getThisItem/:id
// @desc Read item
// @access Private
router.get('/getThisItem/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        if (!item) {
          return res.status(400).json({ itemnotfound: "No item found" })
        }
        res.status(200).json(item)
    })
});

// @route POST api/items
// @desc Create item
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        views: req.body.views,
        commCount: req.body.commCount,
        picUrl: req.body.picUrl,
        title: req.body.title,
        subtitle: req.body.subtitle,
        text: req.body.text,
        by: req.body.by,
        tags: req.body.tags
    });

    newItem.save()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(404).json({ error: "Cannot create post" }));
});

// @route UPDATE api/items/edit/:id
// @desc Update item
// @access Private
router.post('/edit/:id', (req, res) => {
    let editedPost = {
        views: req.body.views,
        commCount: req.body.commCount,
        picUrl: req.body.picUrl,
        title: req.body.title,
        subtitle: req.body.subtitle,
        text: req.body.text,
        by: req.body.by,
        date: req.body.date,
        tags: req.body.tags
    };
    Item.findByIdAndUpdate(req.params.id, editedPost, {new: true}, (err, item) => {
        if(!item) {
            res.status(404).json({ msg: "data is not found" });
        } else {
            item.save()
            res.status(200).send(item)
            // .then(item => res.json({ msg: 'item updated!' }))
            // .catch(() => res.status(400).send("Update not possible"));
        }
    })
    .catch(err => res.status(404).json({ success: false }))
});

// @route DELETE api/items/:id
// @desc Delete item
// @access Private
router.delete('/:id', auth, (req, res) => {
    console.log("back 1 delPost id: ", req.params.id)
    Item.findById(req.params.id)
    .then(item => {
        console.log("back 2 item: ", item)
        item.remove().then(() => {
            console.log("back 3 item removed!")
            res.status(200).json({ success: true })
        })
    })
    .catch(err => {
        console.log("back 4 item not found. ERR: ", err)
        res.status(404).json({ success: false })
    })
});

// @route GET api/items/viewsSource
// @desc Get choosen views
// @access Public
router.get('/viewsSource/:whooseViews/:whatTime', (req, res) => {
    // let OrgViews = []   FOR GRAPHIC
    // let FbViews = []
    // let GoogleViews = []
    let OrgViews = 0
    let FbViews = 0
    let GoogleViews = 0

    const whooseViews = req.params.whooseViews
    const whatTime = req.params.whatTime

    let choosenTime
    const nowTime = new Date();
    const day = nowTime.getDate();
    const month = nowTime.getMonth();
    const year = nowTime.getFullYear();
    const timeDay = new Date(year, month, day - 1)
    const timeWeek = new Date(year, month, day - 7)
    const timeMonth = new Date(year, month - 1, day)
    const timeYear = new Date(year - 1, month, day)
    const timeAll = new Date(year - 10, month, day)

    if(whatTime) {
        if(whatTime == 'day') {
            choosenTime = timeDay
        } else if(whatTime == 'week') {
            choosenTime = timeWeek
        } else if(whatTime == 'month') {
            choosenTime = timeMonth
        } else if(whatTime == 'year') {
            choosenTime = timeYear
        } else if(whatTime == 'all') {
            choosenTime = timeAll
        }
    }
    
    Item.find(whooseViews === 'allUsers' ? {} : {by: whooseViews})
    .then(items => {
        items.map(item => {
            item.views.organic.map(v => {
                if(v.date > choosenTime) {
                    // OrgViews.push(v)   FOR GRAPHIC
                    OrgViews = OrgViews + 1
                }
            })
            item.views.facebook.map(v => {
                if(v.date > choosenTime) {
                    // FbViews.push(v)   FOR GRAPHIC
                    FbViews = FbViews + 1
                }
            })
            item.views.googleAds.map(v => {
                if(v.date > choosenTime) {
                    // GoogleViews.push(v)   FOR GRAPHIC
                    GoogleViews = GoogleViews + 1
                }
            })
        })
    })
    .then(() => {
        res.status(200).json({OrgViews, FbViews, GoogleViews})
    })
});

// @route GET api/items/viewsTime
// @desc Get choosen views
// @access Public
router.get('/viewsTime/:whooseViews/:whatSource', (req, res) => {
    let LastDay = 0
    let LastWeek = 0
    let LastMonth = 0
    let LastYear = 0

    const whooseViews = req.params.whooseViews
    const whatSource = req.params.whatSource

    const nowTime = new Date();
    const day = nowTime.getDate();
    const month = nowTime.getMonth();
    const year = nowTime.getFullYear();
    const timeDay = new Date(year, month, day - 1)
    const timeWeek = new Date(year, month, day - 7)
    const timeMonth = new Date(year, month - 1, day)
    const timeYear = new Date(year - 1, month, day)

    Item.find(whooseViews === 'allUsers' ? {} : {by: whooseViews})
    .then(items => {
        items.map(item => {
            if(whatSource == 'organic') {
                item.views.organic.map(v => {
                    if(v.date > timeDay) {
                        LastDay = LastDay + 1
                    } else if(v.date > timeWeek) {
                        LastWeek = LastWeek + 1
                    } else if(v.date > timeMonth) {
                        LastMonth = LastMonth + 1
                    } else if(v.date > timeYear) {
                        LastYear = LastYear + 1
                    }
                })
            } else if(whatSource == 'facebook') {
                item.views.facebook.map(v => {
                    if(v.date > timeDay) {
                        LastDay = LastDay + 1
                    } else if(v.date > timeWeek) {
                        LastWeek = LastWeek + 1
                    } else if(v.date > timeMonth) {
                        LastMonth = LastMonth + 1
                    } else if(v.date > timeYear) {
                        LastYear = LastYear + 1
                    }
                })
            } else if(whatSource == 'googleAds') {
                item.views.googleAds.map(v => {
                    if(v.date > timeDay) {
                        LastDay = LastDay + 1
                    } else if(v.date > timeWeek) {
                        LastWeek = LastWeek + 1
                    } else if(v.date > timeMonth) {
                        LastMonth = LastMonth + 1
                    } else if(v.date > timeYear) {
                        LastYear = LastYear + 1
                    }
                })
            } else if(whatSource == 'total') {
                item.views.organic.map(v => {
                    if(v.date > timeDay) {
                        LastDay = LastDay + 1
                    } else if(v.date > timeWeek) {
                        LastWeek = LastWeek + 1
                    } else if(v.date > timeMonth) {
                        LastMonth = LastMonth + 1
                    } else if(v.date > timeYear) {
                        LastYear = LastYear + 1
                    }
                })
                item.views.facebook.map(v => {
                    if(v.date > timeDay) {
                        LastDay = LastDay + 1
                    } else if(v.date > timeWeek) {
                        LastWeek = LastWeek + 1
                    } else if(v.date > timeMonth) {
                        LastMonth = LastMonth + 1
                    } else if(v.date > timeYear) {
                        LastYear = LastYear + 1
                    }
                })
                item.views.googleAds.map(v => {
                    if(v.date > timeDay) {
                        LastDay = LastDay + 1
                    } else if(v.date > timeWeek) {
                        LastWeek = LastWeek + 1
                    } else if(v.date > timeMonth) {
                        LastMonth = LastMonth + 1
                    } else if(v.date > timeYear) {
                        LastYear = LastYear + 1
                    }
                })
            }
        })
    })
    .then(() => {
        res.status(200).json({LastDay, LastWeek, LastMonth, LastYear})
    })
});

// @route GET api/items/viewsUser
// @desc Get choosen views
// @access Public
router.get('/viewsUser/:whatSource/:whatTime', (req, res) => {
    const whatSource = req.params.whatSource
    const whatTime = req.params.whatTime

    let usrz = []

    let choosenTime
    const nowTime = new Date();
    const day = nowTime.getDate();
    const month = nowTime.getMonth();
    const year = nowTime.getFullYear();
    const timeDay = new Date(year, month, day - 1)
    const timeWeek = new Date(year, month, day - 7)
    const timeMonth = new Date(year, month - 1, day)
    const timeYear = new Date(year - 1, month, day)
    const timeAll = new Date(year - 10, month, day)

    if(whatTime) {
        if(whatTime == 'day') {
            choosenTime = timeDay
        } else if(whatTime == 'week') {
            choosenTime = timeWeek
        } else if(whatTime == 'month') {
            choosenTime = timeMonth
        } else if(whatTime == 'year') {
            choosenTime = timeYear
        } else if(whatTime == 'all') {
            choosenTime = timeAll
        }
    }

    User.find()
    .then(users => {
        users.map(user => {
            const u = { name: user.name, counting: 0 }
            usrz.push(u)
        })
    }).then(() => {
        Item.find()
        .then(items => {
            items.map(item => {
                usrz.map(us => {
                    if(item.by === us.name) {
                        if(whatSource == 'organic') {
                            item.views.organic.map(v => {
                                if(v.date > choosenTime) {
                                    us.counting = us.counting + 1
                                }
                            })
                        } else if(whatSource == 'facebook') {
                            item.views.facebook.map(v => {
                                if(v.date > choosenTime) {
                                    us.counting = us.counting + 1
                                }
                            })
                        } else if(whatSource == 'googleAds') {
                            item.views.googleAds.map(v => {
                                if(v.date > choosenTime) {
                                    us.counting = us.counting + 1
                                }
                            })
                        } else if(whatSource == 'total') {
                            item.views.organic.map(v => {
                                if(v.date > choosenTime) {
                                    us.counting = us.counting + 1
                                }
                            })
                            item.views.facebook.map(v => {
                                if(v.date > choosenTime) {
                                    us.counting = us.counting + 1
                                }
                            })
                            item.views.googleAds.map(v => {
                                if(v.date > choosenTime) {
                                    us.counting = us.counting + 1
                                }
                            })
                        }
                    }
                })
            })
        })
        .then(() => {
            usrz.sort((a, b) => a.counting - b.counting)
        })
        .then(() => {
            res.status(200).json(usrz)
        })
    })

});

// @route GET api/items/countAll
// @desc Read item
// @access Private
router.get('/countAll/:author', (req, res) => {
    const countAll = {
        Posts: 0,
        Views: 0,
        Comms: 0,
        Users: 0,
        Subs: 0
    }

    Item.find(req.params.author === 'all' ? {} : {by: req.params.author})
    .then(items => {
        countAll.Posts = items.length
        items.map(item => {
            countAll.Views = countAll.Views + item.views.total
        })
    }).then(() => {
        User.find()
        .then(users => {
            countAll.Users = users.length
        })
        Subscriber.find()
        .then(subs => {
            countAll.Subs = subs.length
        })
        Comment.find(req.params.author === 'all' ? {} : {name: req.params.author})
        .then(comments => {
            countAll.Comms = comments.length
        })
        .then(() => {
            Reply.find(req.params.author === 'all' ? {} : {name: req.params.author})
            .then(replies => {
                countAll.Comms = replies.length
            })
            .then(() => {
                res.status(200).json(countAll)
            })
        })
    })
});

// @route GET api/items/screenSize
// @desc Read item
// @access Private
router.get('/screenSize', (req, res) => {
    const screenSize = {
        Phone: 0,
        Tablet: 0,
        Desktop: 0
    }

    Item.find()
    .then(items => {
        items.map(item => {
            item.views.organic.map(v => {
                if(v.screenSize) {
                    if(v.screenSize < 480) {
                        screenSize.Phone = screenSize.Phone + 1
                    } else if(v.screenSize < 1024) {
                        screenSize.Tablet = screenSize.Tablet + 1
                    } else {
                        screenSize.Desktop = screenSize.Desktop + 1
                    }
                }
            })
            item.views.facebook.map(v => {
                if(v.screenSize) {
                    if(v.screenSize < 480) {
                        screenSize.Phone = screenSize.Phone + 1
                    } else if(v.screenSize < 1024) {
                        screenSize.Tablet = screenSize.Tablet + 1
                    } else {
                        screenSize.Desktop = screenSize.Desktop + 1
                    }
                }
            })
            item.views.googleAds.map(v => {
                if(v.screenSize) {
                    if(v.screenSize < 480) {
                        screenSize.Phone = screenSize.Phone + 1
                    } else if(v.screenSize < 1024) {
                        screenSize.Tablet = screenSize.Tablet + 1
                    } else {
                        screenSize.Desktop = screenSize.Desktop + 1
                    }
                }
            })
        })
    }).then(() => {
        res.status(200).json(screenSize)
    })
});

// @route GET api/items/graphix/:date
// @desc Read item
// @access Private
router.get('/graphix/:date', (req, res) => {
    const whatTime = req.params.date
    
    const theFirst = {
        Org: [],
        Fb: [],
        Goog: [],
        dateArray: null
    }
    
    let aSec = []
    let items = []
    let Ar = [[], [], [], [], [], [], [], [], [], [], [], []]
    
    const graphix = {
        Org: null,
        Fb: null,
        Goog: null,
        dayz: null
    }

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
    theFirst.dateArray = dateArray

    Item.find()
    .then(items => {

        dateArray.map(dar => {
            const dayD = dar.getDate();
            const monthD = dar.getMonth();
            const yearD = dar.getFullYear();
            const DTime = new Date(yearD, monthD, dayD)
            
            items.map(item => {
                item.views.organic.map(v => {
                    const dayV = v.date.getDate();
                    const monthV = v.date.getMonth();
                    const yearV = v.date.getFullYear();
                    const vTime = new Date(yearV, monthV, dayV)

                    if(vTime.getTime() === DTime.getTime()) {
                        theFirst.Org.push(v)
                    }
                })
            })
            
            items.map(item => {
                item.views.facebook.map(v => {
                    const dayV = v.date.getDate();
                    const monthV = v.date.getMonth();
                    const yearV = v.date.getFullYear();
                    const vTime = new Date(yearV, monthV, dayV)

                    if(vTime.getTime() === DTime.getTime()) {
                        theFirst.Fb.push(v)
                    }
                })
            })
            
            items.map(item => {
                item.views.googleAds.map(v => {
                    const dayV = v.date.getDate();
                    const monthV = v.date.getMonth();
                    const yearV = v.date.getFullYear();
                    const vTime = new Date(yearV, monthV, dayV)

                    if(vTime.getTime() === DTime.getTime()) {
                        theFirst.Goog.push(v)
                    }
                })
            })
        })
    })
    .then(() => {
        theFirst.dateArray.map(d => {
            items.push({ date: d, views: 0 })
        })

        theFirst.Org.map(v => {
            items.map((d, index) => {
                if(`${d.date.getFullYear()}-${d.date.getMonth()}-${d.date.getDate()}` === `${v.date.getFullYear()}-${v.date.getMonth()}-${v.date.getDate()}`) {
                    items[index].views = items[index].views + 1
                }
            })
        })

        theFirst.Fb.map(v => {
            items.map((d, index) => {
                if(`${d.date.getFullYear()}-${d.date.getMonth()}-${d.date.getDate()}` === `${v.date.getFullYear()}-${v.date.getMonth()}-${v.date.getDate()}`) {
                    items[index].views = items[index].views + 1
                }
            })
        })

        theFirst.Goog.map(v => {
            items.map((d, index) => {
                if(`${d.date.getFullYear()}-${d.date.getMonth()}-${d.date.getDate()}` === `${v.date.getFullYear()}-${v.date.getMonth()}-${v.date.getDate()}`) {
                    items[index].views = items[index].views + 1
                }
            })
        })
        
        if(items.length > 12) {
            const D = items.length/12
            Ar.map((a, index) => {
                let newA = []
                items.map((d, ind) => {
                    if(ind >= (index * D)) {
                        if(ind < ((index + 1) * D)) {
                            newA.push(d)
                        }
                    }
                    Ar[index] = newA
                })
            })
            Ar.map((ar, index) => {
                const highest = ar.sort((a, b) => b.views - a.views)[0]
                Ar[index] = highest
            })
            items = Ar
        }
    })
    .then(() => {
        const myBiggest = items.sort((a, b) => b.views - a.views)[0]
        for(let i = 0; i <= myBiggest.views; i++) {
            aSec.push(i)
        }
        let newA = [[],[],[],[],[],[]]
        if(aSec.length > 6) {
            const D = aSec.length/6
            newA.map((b, index) => {
                let newB = []
                aSec.map((a, ind) => {
                    if(ind >= (index * D)) {
                        if(ind < ((index + 1) * D)) {
                            newB.push(a)
                        }
                    }
                })
                newB = newB.sort((a, b) => b - a)[0]
                newA[index] = newB
            })
        }
        aSec = [0, ...newA]
        aSec.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
    })
    .then(() => {
        graphix.Org = theFirst.Org.length
        graphix.Fb = theFirst.Fb.length
        graphix.Goog = theFirst.Goog.length
        graphix.dayz = items
        graphix.countFromHigh = aSec
        graphix.highest = items.sort((a, b) => b.views - a.views)[0]
    })
    .then(() => {
        graphix.dayz.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    })
    .then(() => {
        res.status(200).json(graphix)
    })
});

// @route GET api/items/getUniques
// @desc Get unique visitors
// @access Private
router.get('/getUniques/:date', (req, res) => {
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

    Item.find()
    .then(items => {
        dateArray.map(dar => {
            const dayD = dar.getDate();
            const monthD = dar.getMonth();
            const yearD = dar.getFullYear();
            const DTime = new Date(yearD, monthD, dayD)

            items.map(item => {
                item.views.organic.map(v => {
                    const dayV = v.date.getDate();
                    const monthV = v.date.getMonth();
                    const yearV = v.date.getFullYear();
                    const vTime = new Date(yearV, monthV, dayV)

                    if(`${yearD}-${monthD}-${dayD}` === `${yearV}-${monthV}-${dayV}`) {
                        if(v.unique === 'unique') {
                            theUniques = theUniques + 1
                        }
                    }
                })
                item.views.facebook.map(v => {
                    const dayV = v.date.getDate();
                    const monthV = v.date.getMonth();
                    const yearV = v.date.getFullYear();
                    const vTime = new Date(yearV, monthV, dayV)

                    if(`${yearD}-${monthD}-${dayD}` === `${yearV}-${monthV}-${dayV}`) {
                        if(v.unique === 'unique') {
                            theUniques = theUniques + 1
                        }
                    }
                })
                item.views.googleAds.map(v => {
                    const dayV = v.date.getDate();
                    const monthV = v.date.getMonth();
                    const yearV = v.date.getFullYear();
                    const vTime = new Date(yearV, monthV, dayV)

                    if(`${yearD}-${monthD}-${dayD}` === `${yearV}-${monthV}-${dayV}`) {
                        if(v.unique === 'unique') {
                            theUniques = theUniques + 1
                        }
                    }
                })
            })
        })
    })
    Other.find()
    .then(items => {
        items.map(item => {
    
            dateArray.map(dar => {
                const dayD = dar.getDate();
                const monthD = dar.getMonth();
                const yearD = dar.getFullYear();

                const dayV = item.date.getDate();
                const monthV = item.date.getMonth();
                const yearV = item.date.getFullYear();

                if(`${yearD}-${monthD}-${dayD}` === `${yearV}-${monthV}-${dayV}`) {
                    if(item.unique === 'unique') {
                        theUniques = theUniques + 1
                    }
                }
            })
        })
    })
    .then(() => {
        res.status(200).json({uniques: theUniques})
    })
});

module.exports = router;