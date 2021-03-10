const express = require('express');
const router = express.Router();
const multer  = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
Grid.mongo = mongoose.mongo;

// DB Config
const db = process.env.MONGO_URI;

// Create connection
const conn = mongoose.createConnection(db)

// Init gfs
let gfs;

conn.once('open', () => {
   // gfs = Grid(conn.db);
   // gfs.collection('uploads');
   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
   });
});

// set up connection to db for file storage
const storage = new GridFsStorage({
   url: db,
   file: (req, file) => {
      
      return new Promise(resolve => {
         const filename = file.originalname;
         const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
         };
         resolve(fileInfo);
      });
      
   }
});

// sets file input to single file
const singleUpload = multer({
   storage,
   limits:{fileSize: 3000000}
}).single('file');

// // @route GET /uploads/files
// // @desc Get all files in json
// // @access Public
router.get('/files', (req, res) => {
   gfs.find().toArray((err, files) => {
      if(!files || files.length === 0) {
         return res.status(404).json({ err: 'No files exist' });
      } else {
         files.map(file => {
            if (
               file.contentType === 'image/jpeg' ||
               file.contentType === 'image/jpg' ||
               file.contentType === 'image/png'
            ) {
               file.isImage = true;
            } else {
               file.isImage = false;
            }
         });
         return res.send(files);
      }
   })
});

// // @route GET /uploads/files/:filename
// // @desc Get only one file in json
// // @access Public
router.get('/files/:filename', (req, res) => {
   gfs.find({ filename: req.params.filename }).toArray((err, file) => {
      if(!file || file.length === 0) {
         return res.status(404).json({ err: 'No file exist' });
      } else {
         if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/jpg' ||
            file.contentType === 'image/png'
         ) {
            file.isImage = true;
         } else {
            file.isImage = false;
         }
         return res.send(file);
      }
   })
});

// // @route GET /uploads/image/:filename
// // @desc Get single file in json
// // @access Public
router.get('/image/:filename', (req, res) => {
   console.log("API IMAGE")
   gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if(!files[0] || files[0].length === 0){
         return res.status(404).json({ err: "Could not find file" });
      } else if(
         files[0].contentType === 'image/jpeg' ||
         files[0].contentType === 'image/jpg' ||
         files[0].contentType === 'image/png'
      ) {
         const readstream = gfs.openDownloadStreamByName(req.params.filename);
         readstream.pipe(res);
      } else {
         res.status(404).json({ err: 'Not an image' });
      }
   });
});

// @route POST /uploads/upload
// @desc Post image
// @access Public
router.post('/upload', singleUpload, (req, res) => {
   if (req.file) {
      return res.status(200).json({
         _id: req.file.id,
         chunkSize: req.file.chunkSize,
         uploadDate: req.file.uploadDate,
         filename: req.file.filename,
         md5: req.file.md5,
         contentType: req.file.contentType,
         isImage: true
      });
   } else {
      res.status(404).json({ success: false });
   }
});

// // @route DELETE /uploads/files/:id
// // @desc Delete file
// // @access Public
router.delete('/files/:id', (req, res) => {
   if(req.params.id !== '5f7c6895d276b443684c93b3') {
      const obj_id = new mongoose.Types.ObjectId(req.params.id)
      console.log("DEL IMG: ", obj_id)
      gfs.delete( obj_id )
      res.status(200).json({ msg: "File deleted!" })
   } else {
      res.status(500).json({ msg: "You cannot delete the default image!" })
   }
})

module.exports = router;



// (node:1144) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// (node:1144) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.