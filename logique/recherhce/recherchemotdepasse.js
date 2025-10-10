const crypter=require('bcrypt')
const jwt=require('jsonwebtoken');



const rechercher=async(res,pass,resp)=>{
        for(let i=0;i<res.length;i++)
        {
                    const result = await crypter.compare(pass,res[i].motdepasse);
                    console.log(result);


                    if(result) {//ici on va faire tout le travaille (authentification)
                    console.log("utilisateur existe dans la base de données");
                    const token=jwt.sign({nom:res[i].nom,prenom:res[i].prenom},"jwt-secret-key",{expiresIn:"1d"})
                    resp.cookie('token',token);
                    return resp.send("utilisateur existe dans la base données et voici le token");

                    }


        }


        

resp.send('utilisateur n\'existe pas dans la base de données');


}


module.exports=rechercher;