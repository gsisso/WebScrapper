import {Router} from "express";
import {parse} from "./parse";


const router = Router()

router.use('/parse', parse);

export { router as routes };