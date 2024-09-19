const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Caption = require('./models/Caption'); 
const app = express();
const port = 3000;

// Connection URL
const dbURI = 'mongodb://localhost:27017/Project6_2';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Project6_2')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Set up multer for file upload handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create a new caption
app.post('/captions', async (req, res) => {
    try {
        const newCaption = new Caption({
            text: req.body.text
        });
        const savedCaption = await newCaption.save();
        res.json(savedCaption);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all captions
app.get('/captions', async (req, res) => {
    try {
        const captions = await Caption.find();
        res.json(captions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));


// Handle POST request to generate image caption
app.post('/generate-caption', upload.single('image'), async (req, res) => {
    if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    console.log('File uploaded:', req.file);

    // Placeholder for caption generation logic
    const generatedCaption = 'This is a simulated caption for the image.';
    
    
    // Save to MongoDB
//  //   const newCaption = new Caption({
//         caption: generatedCaption,
//         imagePath: req.file.imagepath, // Or any other path you use
//     });
    
//     newCaption.save()
//         .then(() => res.json({ caption: generatedCaption }))
//         .catch(err => res.status(500).json({ error: err.message }));

    await Caption.create({
        caption: generatedCaption,
        imagePath: req.file.path,

    })
    return res.status(201).json({ message: 'Caption saved successfully!' })
});

// Example route for handling an image upload and caption save
app.post('/upload', (req, res) => {
    const newCaption = new Caption({
        // Assuming you're capturing the caption from the request body
        caption: req.body.caption,
        imagePath: req.body.imagepath // Adjust as necessary for your case
    });

    newCaption.save()
        .then(() => res.status(201).json({ message: 'Caption saved successfully!' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Catch-all route for any other requests
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
module.exports = app;



