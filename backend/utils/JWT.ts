import { expressjwt } from "express-jwt";
import * as env from "../.env.ts";
import jwt from "jsonwebtoken";


export const JWTgenerator = (username : string, email : string) => {
    try {
        const payload : {username : string, email : string} = { username, email };
        const secret : jwt.Secret = env.default.JWT_SECRET;
        const options : jwt.SignOptions = {expiresIn: 3600, algorithm : "HS256"};
        console.log(secret);
        /**
         *  export function sign(
            payload: string | Buffer | object,
            secretOrPrivateKey: Secret,
            options?: SignOptions,
        ): string;
         */
        const token : string = jwt.sign(payload, secret, options);

        return { error: false, token };
    } catch (error) {
        console.error();
        return { error: true };
    }
}
