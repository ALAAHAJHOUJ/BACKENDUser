const express=require("express");
const app=express();
const cors=require('cors')
const conn=require("./basededonnes/db")

app.use(cors());



app.get("/:nom/:prenom",(req,res)=>{
const nom1=req.params.nom;
const prenom=req.params.prenom;
const sql = `insert into Admine (nom,prenom,image,motdepasse,email) values ("${nom1}","${prenom}","image1","gdgdfdf","alaa.spread@gmail.com")`;

      conn.query(sql, (err, results) => {
              if (err) {
                console.error('Erreur lors de l’exécution de la requête :');
                return res.status(500).send('Erreur serveur');
              }


              console.log("requet passsée avec succes!!!!");
              res.send('requete passée avec succes');
            });


})




app.get("/supprimer",(req,res)=>{
console.log("debut de la demande ");
const sql='delete from Admine';
conn.query(sql,(err,results)=>{
  if (err) {
    console.error('Erreur lors de l’exécution de la requête :');
    return res.status(500).send('Erreur serveur');
  }

  
  console.log("requet passsée avec succes!!!!");
  res.send('suppression avec succes');

})
})




app.get("/tester/:id",(req,res)=>{
console.log(req.params);
console.log('demande pour l\'endpoint tester');
res.send("demande traitée");
})



app.listen(8000,()=>{
    console.log('server is running on port 8000');
})