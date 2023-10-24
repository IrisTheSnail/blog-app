import { Router } from 'express';
import * as Service from "../services/auth";

export const routerAuth = Router();

routerAuth.post("/login", async (req, res) => { //we won't be sending username to backend right ?
    try{
        let data : string = JSON.stringify(req.body);
        let parsing = JSON.parse(data);
        var jwt : { error: boolean; token: string; } | { error: boolean; token?: undefined; } | undefined 
            = await Service.loginJWT(parsing);
        

    } catch(err) { 
        console.error(err); 
        res.status(401).send("who is this?");} //we both know this is wrong 
    finally{
        if (!(jwt?.error)) {
            res.status(200).send("welcome back " + jwt?.token); // "welcome back [username] !"
        } else {
            res.status(401).send("Authentication failed");
        }

    }

});

