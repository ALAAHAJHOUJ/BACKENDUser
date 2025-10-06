const crypter=require('bcrypt');


const nombre=10;


const crypter1=(password)=>{
const salt=crypter.genSaltSync(nombre);

console.log(password);
return crypter.hashSync(password,salt)


}




module.exports = crypter1;