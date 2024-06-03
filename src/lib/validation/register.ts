import joi from "joi"
import { IRegister } from "../../type/app"

export const registerValidation = 
joi.object<IRegister>({
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    fullname: joi.string().required(),
 });