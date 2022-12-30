import express from 'express';
import fs from 'fs';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation} from './validations.js';

import { handleValidationErrors, checkAuth} from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB connection has problems', err))
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


 
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },

});
const upload = multer({ storage });

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/all', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/tags/:tagsN', PostController.getAllF);
app.get('/posts/:id', PostController.getOne);
app.post('/posts/', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);


app.listen(process.env.PORT || 4444, (err) => {
if (err) {
    return console.log(err, 'Server has problem')
}
console.log('Server had started')
})
 
