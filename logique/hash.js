const crypter=require('bcrypt');
const comparer = require('./comparer');


const nombre=10;


const crypter1=(password)=>{
const salt=crypter.genSaltSync(nombre);

console.log("mot de passe 111:"+salt);
console.log('resultat final:'+crypter.hashSync(password,salt))
console.log(comparer(password,salt));



return crypter.hashSync(password,salt)


}




module.exports = crypter1;