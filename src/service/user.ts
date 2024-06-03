import db from "../db"
import { registerValidation } from "../lib/validation/register"
import { IRegister} from "../type/app"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async () => {
    return await db.user.findMany(
        {
            select: {
                id: true,
                username: true,
                fullname: true,
                profile : {
                    select : {
                        avatar: true
                    }
                },
            },
        }
    );
};

export const getOtherUsers = async (id: number) => {
    const user = await db.$queryRaw`
        SELECT "User".id, "User".username, "User".fullname, "Profile".avatar
        FROM "User"
        LEFT JOIN "Profile" ON "User".id = "Profile"."userId"
        WHERE "User".id != ${id}
        ORDER BY random()
        LIMIT 3
    `;
    return user;
};

export const getUser = async (id: number) => {
    return await db.user.findFirst({
        where: {
            id,
        },
    });
};

export const register = async (payload: IRegister) => {
    const { value, error} = registerValidation.validate(payload);
    if (error) {
        throw new Error (error.details[0].message)
    }
    

    const isExist = await db.user.findFirst({
        where: {
            OR: [
                {
                    username: value.username
                },
                {
                    email: value.email,
                }
            ]
        }
    })

    console.log("Existing user:", isExist)

    if (isExist) {
        throw new Error("Username or email already exist")
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword;

    const user = await db.user.create({
        data: {
            ...value,
        }
    })

    const profile = await db.profile.create({
        data: {
           userId: user.id,
        },
     });

    return { user, profile}
    
}

export const login = async (
    username: string,
    password: string
 ): Promise<string> => {
    const user = await db.user.findFirst({
       where: {
          OR: [
             {
                username,
             },
             {
                email: username,
             },
          ],
       },
    });
 
    if (!user) {
       throw new Error("User or password is not valid");
    }
 
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
       throw new Error("User or password is not valid");
    }
 
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
       expiresIn: "1d",
    });
 
    return token;
 };