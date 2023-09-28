import crypto from 'crypto';

var genRandomString = function(length : number){
  return crypto.randomBytes(Math.ceil(length/2))
  .toString('hex')
  .slice(0,length);
};

var sha512 = function(password : any, salt : any){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt:salt,
    passwordHash:value
  };
};

export function saltHashPassword(userpassword : any) {
  var salt = genRandomString(16);
  var passwordData = sha512(userpassword, salt);
  // console.log('Passwordhash = '+passwordData.passwordHash);
  // console.log('\nSalt = '+passwordData.salt);
  return passwordData;
}

