import express from 'express';
import {parseWebURL} from "../../modules/parse/middlewares/parse.middleware";

const router = express.Router()

//TODO: do we need to have permissions for these routes ?
router.use((req, res, next) => {
    next();
});

router.post('/', parseWebURL);


export { router as parse };