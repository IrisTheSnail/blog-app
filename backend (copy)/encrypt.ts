import bcrypt from 'bcrypt';

var crypto = require('crypto');



var genRandomString = function(length : number){
  return crypto.randomBytes(Math.ceil(length/2))
  .toString('hex')
  .slice(0,length);
};

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt:salt,
    passwordHash:value
  };
};

function saltHashPassword(userpassword) {
  var salt = genRandomString(16);
  var passwordData = sha512(userpassword, salt);
  console.log('UserPassword = '+userpassword);
  console.log('Passwordhash = '+passwordData.passwordHash);
  console.log('\nSalt = '+passwordData.salt);
}

