import { expressjwt } from "express-jwt";
import * as env from "../.env.ts";
import jwt from "jsonwebtoken";


export const JWTgenerator = (username : string, email : string) => {
    try {
        const payload = { username, email };
        console.log(env.default.JWT_SECRET);
        /**
         *  export function sign(
            payload: string | Buffer | object,
            secretOrPrivateKey: Secret,
            options?: SignOptions,
        ): string;
         */
        const token : string = jwt.sign(payload, env.default.JWT_SECRET, 
            {expiresIn: 3600, algorithm : "HS256"});

        return { error: false, token };
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}
