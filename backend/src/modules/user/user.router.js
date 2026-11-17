import { multerFun } from "../../../services/service.js"
import { authMiddle } from "../../middleWares/auth.middle.js"
import validation from "../../middleWares/validation.middle.js"
import * as USC from "./user.controller.js"
import * as USV from "./user.validation.js"
import { Router } from "express"
const router = Router()
router.get("/getUser",authMiddle,USC.getUser)
router.patch("/updateProfile",validation(USV.udateProfileSchema),USC.updateProfile)
router.patch('/changePassword',validation(USV.changePasswordSchema),USC.changePassword)
router.post('/upload',multerFun().single('image'),USC.uploadImage)
export default router