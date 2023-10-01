import { deleteUserService, userValidation } from '../services/user';
import { getUserService } from '../services/user';
import { changeUsername } from '../services/user';
import { changePassword } from '../services/user';
import { getSpecificUserService } from '../services/user';
import { Router } from 'express';


export const router = Router();

router.post("/user", (req, res) => {
    
    let data : string = JSON.stringify(req.body);
    
    let parsing = JSON.parse(data);
    
    try{
        userValidation(parsing);
    } catch {(err : Error) => console.error(err)} //we both know this is wrong 
    // finally{res.status(401).send("User not added");}

    res.status(201).send("User added successfully!");
})
    

router.get("/user", async (req, res) => {

    let r =  await getUserService();

    res.status(200).json(r);
}
);

router.patch("/user/:id", (req, res) => {
    
    const id = req.params.id;
    const newUsername : string | undefined = req.body.username;
    const newPassword : string | undefined = req.body.password;
    if(newUsername){
        try{
            console.log("the id : "  +  id + "\n");
            console.log(newUsername);
            changeUsername(id , newUsername);
        }catch{(err : Error) => {console.log(err);}}
        res.status(201).send("user username updated successfully");

    }
    if(newPassword){
        try{
            console.log("the id : "  +  id + "\n");
            console.log(newPassword);
            changePassword(id, newPassword);
        }catch{(err : Error) => {console.log(err);}}
        res.status(201).send("user password updated successfully");

    }
    
    
});
//so a user want to either change his username or his password.... he can't change the email

//i should implement get specific user after this 

router.get("/user/:id", async (req, res) => {

    const id = req.params.id;
    let r =  await getSpecificUserService(id);

    res.status(200).json(r);
});

router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    deleteUserService(id);

    res.status(201).send("user "+ id + " deleted successfully");
});
