const crypter=require('bcrypt');


const comparer=(passwordSiaisie,passwordhache)=>{
    
    return crypter.compareSync(passwordSiaisie,passwordhache)
}


module.exports=comparer;