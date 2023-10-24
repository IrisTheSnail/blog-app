import User from '../types/users.types';
import { pool } from './db';

export const selectAllUsers = async () => {

    return pool.query('SELECT * FROM users');
    
}

export const insertUser = (InsertUser : User) => {
    pool.query('INSERT INTO users (id, username, email, hash, salt) VALUES ($1, $2, $3, $4, $5)',
    [InsertUser.ID, InsertUser.username, InsertUser.email, InsertUser.hash, InsertUser.salt],
    (error: any, results: any) => {
        if(error) throw error;
    })
};

export const UpdateUsername = (id : string, newUsername : string | undefined) => {
    pool.query('UPDATE users SET username = $1, updated_at = NOW() WHERE id = $2', 
    [newUsername, id], 
    (error: any, results: any) => {
        if(error) throw error;
        console.log(results.rows);
    })
};

export const UpdateUserPassword = (id : string, newPassword : { salt: string; passwordHash: string; }) => {
    pool.query('UPDATE users SET hash = $1, salt = $2, updated_at = NOW() WHERE id = $3', 
    [newPassword.passwordHash, newPassword.salt, id], 
    (error: any, results: any) => {
        if(error) throw error;
        console.log(results.rows);
    })
};

export const selectUserById = async (id : string) => {
    return pool.query('SELECT * FROM users WHERE id = $1', [id]);
};

export const deleteUser = async (id : string) => {
    return pool.query("DELETE FROM users WHERE id = $1", [id]);
};

export const selectUserByEmail = async (email : string) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
};