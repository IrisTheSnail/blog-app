import { deleteUser, insertUser, selectAllUsers, selectUser, UpdateUsername, UpdateUserPassword } from "../dao/user";
import User from "../types/users.types";
import { emailValidation } from "../utils/emailValid";
import { genUUID } from "../utils/genUUID";
import { saltHashPassword } from "../utils/hash";



export const userValidation = (parsedUser: { password: string; username: string; email: string; }) : boolean => {

    let hash_salt = saltHashPassword(parsedUser.password);

    if(emailValidation(parsedUser.email)){

        let insertThisUser : User = {
            ID : genUUID(),
            username: parsedUser.username,
            email: parsedUser.email,
            hash : hash_salt.passwordHash,
            salt : hash_salt.salt,	
        }

        insertUser(insertThisUser);

        return true;

    }else {throw "email ain't valid!"}
};

export const getUserService = async () => {
    
    return selectAllUsers();
}

export const changeUsername = (id : string, newUsername : string | undefined) => {
    UpdateUsername(id, newUsername);
}

export const changePassword = (id : string, newPassword : string | undefined) => {
    let hash_salt = saltHashPassword(newPassword);
    UpdateUserPassword(id, hash_salt);

}

export const getSpecificUserService = async (id : string) => {
    return selectUser(id);
}

export const deleteUserService = async (id : string) => {
    return deleteUser(id);
}