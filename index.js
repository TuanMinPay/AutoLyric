var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const dUri = new DatauriParser();
const path = require('path');

const multer = require("multer");
const upload = multer();


cloudinary.config({
    cloud_name: "baongay-corp",
    api_key: "237526558842261",
    api_secret: "e6SyfhULmvb-y5ywUdDS8vi14Qc"
});


app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/api/upload/audio', upload.single('file'), (req, res) => {
    try {
        cloudinary.uploader.upload('data:image/' + path.extname(req.file.originalname).toString() + ';base64,' + dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer).base64, {
            resource_type: "auto",
            folder: "AutoLyric"
        }, (error, result) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status(200).send(result.secure_url);
            };
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8888, function() {
    console.log('AutoLyric server listening on port 8888!');
});