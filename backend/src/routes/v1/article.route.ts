import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {insertArticle,getAllArtilces, getArticle, proposeArticle, voteArticle, queueArticle, executeArticle} from './../../controllers/v1/article.controller'
import {globals} from './../../constants'
import {fileHandler} from "../../middlewares/fileHandler"
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path';

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let filePath =  path.join(__dirname, '..', '..', '/uploads')
        if (!fs.existsSync(filePath)){
            fs.mkdirSync(filePath, { recursive: true })
        }
        cb(null, filePath)
    },

    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })

router.post('/article', upload.single("file"), fileHandler, insertArticle);

// router.post('/article', insertArticle);
router.get('/getAllArticles', getAllArtilces);
router.get('/article/:articleId',getArticle);
router.post('/article/propose',  proposeArticle);
router.post('/article/vote',  voteArticle);
router.post('/article/queue',  queueArticle);
router.post('/article/execute',  executeArticle);



export = router;
