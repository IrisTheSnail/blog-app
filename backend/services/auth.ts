import  * as dao from "../dao/user";
import { saltHashPassword } from "../utils/hash";
import { getSpecificUserEmail } from "../services/user";
import { JWTgenerator } from "../utils/JWT";
        
        
export const loginJWT = async (parsing: { password: string; email: string; }) => {
    let userFromDB = await getSpecificUserEmail(parsing.email);
    if(userFromDB.rows[0]?.email === parsing.email){
        let hash = saltHashPassword(parsing.password, userFromDB.rows[0]?.salt);
        if(userFromDB.rows[0]?.hash === hash.passwordHash){
            let JWT = JWTgenerator(userFromDB.rows[0]?.username, parsing.email);
            return JWT;
        }
        
        
    }
  
}