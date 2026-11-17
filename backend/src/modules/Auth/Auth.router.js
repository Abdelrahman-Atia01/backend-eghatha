import { Router } from "express";
import * as AUC from "./Auth.controller.js"
import * as USC from './Auth.validation.js'
import validation from "../../middleWares/validation.middle.js";
const router =Router()
router.post("/register",validation(USC.registerSchema),AUC.register)
router.post("/login",validation(USC.loginSchema),AUC.login)
router.get("/activate_account/:emailToken",AUC.activate_account)
export default router

