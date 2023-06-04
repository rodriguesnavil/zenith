import * as express from 'express';
import { helloWorld } from "../../controllers/v1/hello.controller";

const router = express.Router();

router.get('/hello', helloWorld);

export = router;