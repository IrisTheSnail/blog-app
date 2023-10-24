import  * as dao from "../dao/user";
import User from "../types/users.types";
import { emailValidation } from "../utils/emailValid";
import { genUUID } from "../utils/genUUID";
import { saltHashPassword } from "../utils/hash";
import { currentServerSalt } from "../server";


export const addUser = (parsedUser: { password: string; username: string; email: string; }) : boolean => {

    let hash_salt = saltHashPassword(parsedUser.password, currentServerSalt);

    if(emailValidation(parsedUser.email)){

        let insertThisUser : User = {
            ID : genUUID(),
            username: parsedUser.username,
            email: parsedUser.email,
            hash : hash_salt.passwordHash,
            salt : hash_salt.salt,
        }

        dao.insertUser(insertThisUser);

        return true;

    }else {throw "email ain't valid!"}
};

export const getUserService = async () => {
    
    return dao.selectAllUsers();
}

export const changeUsername = (id : string, newUsername : string | undefined) => {
    dao.UpdateUsername(id, newUsername);
}

export const changePassword = (id : string, newPassword : string | undefined) => {
    let hash_salt = saltHashPassword(newPassword, currentServerSalt);
    dao.UpdateUserPassword(id, hash_salt);

}

export const getSpecificUserId = async (id : string) => {
    return dao.selectUserById(id);
}

export const deleteUser = async (id : string) => {
    return dao.deleteUser(id);
}

export const getSpecificUserEmail = async (email : string) => {
    return await dao.selectUserByEmail(email);
}