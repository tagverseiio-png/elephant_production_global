import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads/media directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'media');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for videos and images
  },
  fileFilter: (req, file, cb) => {
    // Basic file extension checking could be done here if needed.
    // Assuming mostly images and standard video formats based on frontend.
    cb(null, true);
  },
});

router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Return the relative URL to access the uploaded file
    const fileUrl = `/api/media/${req.file.filename}`;
    return res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
});

// For gallery uploads
router.post('/multiple', upload.array('files', 20), (req, res) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const urls = (req.files as Express.Multer.File[]).map(
      (file) => `/api/media/${file.filename}`
    );
    
    return res.status(200).json({ urls });
  } catch (error) {
    console.error('Upload multiple error:', error);
    return res.status(500).json({ error: 'Failed to upload files' });
  }
});

export default router;
