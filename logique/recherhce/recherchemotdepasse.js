const crypter=require('bcrypt')

const rechercher=async(res,pass,resp)=>{
        for(let i=0;i<res.length;i++)
        {
                    const result = await crypter.compare(pass,res[i].motdepasse);
                    console.log(result);


                    if(result) {//ici onva faire tout le travaille (authentification)
                    console.log("utilisateur existe dans la base de données")
                    return resp.send("utilisateur existe dans la base données")

                    }


        }


        

resp.send('utilisateur n\'existe pas dans la base de données');


}


module.exports=rechercher;