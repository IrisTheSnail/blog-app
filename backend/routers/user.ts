import { Router } from 'express';
import * as Service from "../services/user";


export const router = Router();

router.post("/user", (req, res) => {
    
    let data : string = JSON.stringify(req.body);
    
    let parsing = JSON.parse(data);
    
    try{
        Service.addUser(parsing);
    } catch {(err : Error) => console.error(err)} //we both know this is wrong 
    // finally{res.status(401).send("User not added");}

    res.status(201).send("User added successfully!");
})

//is this the literal signup? can it be just used as such?
    

router.get("/user", async (req, res) => {

    let r =  await Service.getUserService();

    res.status(200).json(r);
}
);

router.patch("/user/:id", (req, res) => {
    
    const id = req.params.id;
    const newUsername : string = req.body.username;
    const newPassword : string = req.body.password;
    if(newUsername){
        try{
            Service.changeUsername(id , newUsername);
        }catch{(err : Error) => {console.log(err);}}
        res.status(201).send("user username updated successfully");

    }
    if(newPassword){
        try{
            console.log("the id : "  +  id + "\n");
            console.log(newPassword);
            Service.changePassword(id, newPassword);
        }catch{(err : Error) => {console.log(err);}}
        res.status(201).send("user password updated successfully");

    }
    
    
});
//so a user wants to either change his username or his password.... he can't change the email

router.get("/user/:id", async (req, res) => {

    const id = req.params.id;
    let r =  await Service.getSpecificUserId(id);

    res.status(200).json(r);
});

router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    Service.deleteUser(id);

    res.status(201).send("user "+ id + " deleted successfully");
});

