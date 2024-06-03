import { Request, Response } from "express";
import * as userService from "../service/user"

export const register = async (req: Request, res: Response) => {
    try {
        const { body } = req

        console.log(body);
        
        const result = await userService.register(body)

        res.json({
            status: true,
            message: "success",
            data: result
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log(err)

        res.status(500).json({
            status: false,
            message: err.message
        })
        
    }
}

    export const login = async (req: Request, res: Response) => {
        try {
            const {username, password} = req.body;
            const token = await userService.login(username, password)
            
            res.json({
                status: true,
                message: "success",
                data: token
            });
        } catch (error) {
            const err = error as unknown as Error
            console.log(err);

            res.status(500).json({
                status: false,
                message: err.message,
            })
        }
    }

    export const getUsers = async (req: Request, res: Response) => {
        try {
            const users = await userService.getUsers();

            res.json({
                status: true,
                messsage: "success",
                data: users
            })
        } catch (error) {
            const err = error as unknown as Error;
            console.log(err);
            
            
            res.status(500).json({
               status: false,
               message: err.message,
            });
        }
    }

    export const getOtherUsers = async (req: Request, res: Response) => {
        try {
        const loggedInUserId = res.locals.user; 
        const users = await userService.getOtherUsers(loggedInUserId);

            res.json({
                status: true,
                messsage: "success",
                data: users
            })

        } catch (error) {
            const err = error as unknown as Error;
            console.log(err);

            res.status(500).json({
                status: false,
                message: err.message,
             });
        }
    }