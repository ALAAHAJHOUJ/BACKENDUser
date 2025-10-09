const express=require("express");
const app=express();
const cors=require('cors')
const conn=require("./basededonnes/db");
const crypter1 = require("./logique/hash");
const comparer = require("./logique/comparer");
const multer=require('multer');
const crypter2=require('bcrypt');
const recherche=require('./logique/recherhce/recherchemotdepasse')



app.use(cors());//autoriser les requetes

app.use(express.json());//middelwere pour forma Json


//pour personnaliser le nom de l'image telechargée
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('je suis executé'+req.Value)
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    cb(null,req.Value+".jpeg");
  }
})



const upload=multer({storage});//middelwere pour formdata (fichiers)



const middelwereError=(err,req,res,next)=>{//middelwere de gestion d'erreurs
res.send('une erreur est servenu');
}




const routeMiddleware=(req, res, next)=> {//middelwere qui sera executé avant l'upload de l'image
  const sql="select * from Admine";
  let nombreLignes;
  conn.query(sql,(err,resutat)=>{
    if(err) {console.log('erreur lors de l\'execution de laquery sql');const error=new Error("une erreur est servenu pendant l'executionde laquery sql");next(error)}
    const nombreLignes=+resutat.length+1;

    const nomImage="image"+nombreLignes;
    req.Value=nomImage;
      next();
  })

}












app.post("/inscription/",routeMiddleware,upload.single('image'),(req,res)=>{

const recherche=`select * from Admine where email="${req.body.email}"`;
const motdepasse=req.body.password;
console.log(req.Value);



        conn.query(recherche,(err,results)=>{
          if (err) {
            console.error('Erreur lors de l’exécution de la requête :');
            return res.status(500).send('Erreur serveur');
          }




          if(results.length!==0)//vérifier si l'email existe dans la base de données (s'il existe on envoie une reponse au client et l'utilisateur ne va pas s'enregistrer)
          {
          console.log("l'email existe déja!!!");
          return res.send("l'email existe déja!!!")
          }



          else //on va commencer le processus de l'enregistrement de l'utilisateur 
          {
          //cryptage du mot de passe
            const crypter=crypter1(motdepasse);
            console.log("voila"+crypter);
            //on va commencer l'enregistrement de l'utilisateur dans la base de données
            const nomImage=req.Value;
            const inerstion=`insert into Admine (nom,prenom,image,motdepasse,email) values ("${req.body.nom}","${req.body.prenom}","${nomImage}","${crypter}","${req.body.email}")`
            conn.query(inerstion,(err,resultat)=>{
              if(err) {console.log(err);return res.send("erreur")}
              res.send("enregistrement avec succes")
            })

          }

        })

})






app.post("/Login", (req,res)=>{//endpointde l'autentification
const {nom,password}=req.body;//recuperer les données utilisateur
console.log(nom,password);




const rechercher=`select * from Admine where nom="${nom}"  `;

          conn.query(rechercher,(err,resultat)=>{
            if(err) {console.log(err);return res.send("une erreur est servenue")}

              recherche(resultat,password,res);//on va chercher maintenant dans la table pour savoir la ligne qui contient le mot de passe convenable
            



          })




})





app.post("Logout",(req,res)=>{   //endpoint de déconnexion
console.log("déconnexion")
})







app.use(middelwereError);//gerer les erreurs si un middelewere est arreté pour une certaine raison



app.listen(8000,()=>{
    console.log('server is running on port 8000');
})