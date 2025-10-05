const express=require("express");
const app=express();
const cors=require('cors')
const conn=require("./basededonnes/db")

app.use(cors());

app.use(express.json());



app.post("/:nom/:prenom",(req,res)=>{
const nom1=req.params.nom;
const prenom=req.params.prenom;
const sql = `insert into Admine (nom,prenom,image,motdepasse,email) values ("${nom1}","${prenom}","image1","gdgdfdf","alaa.spread@gmail.com")`;

      conn.query(sql, (err, results) => {
              if (err) {
                console.error('Erreur lors de l’exécution de la requête :');
                return res.status(500).send('Erreur serveur');
              }


              console.log("requet passsée avec succes!!!!");
              res.send("request with succes");
            });


})








app.post("/inscription/",(req,res)=>{
console.log('inscription');
console.log(req.body.email)

const recherche=`select * from Admine where email="${req.body.email}"`;


conn.query(recherche,(err,results)=>{
  if (err) {
    console.error('Erreur lors de l’exécution de la requête :');
    return res.status(500).send('Erreur serveur');
  }


  if(results.length!==0)//vérifier si l'email existe dans la base de données
  {
  console.log("l'email existe déja!!!");
  return res.send("l'email existe déja!!!")
  }

})

})


app.listen(8000,()=>{
    console.log('server is running on port 8000');
})