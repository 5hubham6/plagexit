const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const router = express.Router();

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("answerKeys"); // Match the bucketName used in upload
});

// Route to retrieve file by ID
router.get("/api/professor-answer/file/:fileId", (req, res) => {
  gfs.files.findOne(
    { _id: mongoose.Types.ObjectId(req.params.fileId) },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ error: "File not found" });
      }

      // Check if file is a PDF
      if (file.contentType === "application/pdf") {
        const readstream = gfs.createReadStream(file._id);
        readstream.pipe(res);
      } else {
        res.status(404).json({ error: "Not a PDF file" });
      }
    }
  );
});

module.exports = router;
