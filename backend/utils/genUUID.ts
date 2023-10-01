import crypto from 'crypto';

export function genUUID(){
    return crypto.randomUUID();
}

