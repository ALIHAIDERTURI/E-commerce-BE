const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the correct relative path to the uploads directory
        cb(null, 'uploads/content');
    },
    filename: function (req, file, cb) {
        // Log the original file name for debugging
        // console.log('Original Filename:', file.originalname);

        // Set the file name
        const filename = Date.now() + path.extname(file.originalname);
        // console.log('Generated Filename:', filename);
        cb(null, filename);
    }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
