const crypter=require('bcrypt');
const comparer = require('./comparer');


const nombre=10;


const crypter1=(password)=>{
const salt=crypter.genSaltSync(nombre);



return crypter.hashSync(password,salt)


}




module.exports = crypter1;