const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(methodOverride('_method'));

// Connect to mongo
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log("erooooor: ", err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/subscribers', require('./routes/api/subscribers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/comments', require('./routes/api/comments'));
app.use('/api/replies', require('./routes/api/replies'));
app.use('/api/privpols', require('./routes/api/privpols'));
app.use('/api/termscons', require('./routes/api/termscons'));
app.use('/api/uploads', require('./routes/api/uploads'));
app.use('/api/aboutus', require('./routes/api/aboutus'));
app.use('/api/other', require('./routes/api/other'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
