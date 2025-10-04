const express=require("express");
const app=express();
const cors=require('cors')
const conn=require("./basededonnes/db")

app.use(cors());



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
              res.send('requete passée avec succes');
            });


})




app.delete("/supprimer",(req,res)=>{
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




app.get("/getUsers",(req,res)=>{


  conn.query('SELECT * FROM Admine', (err, result) => {
    if (err) {console.log('erreur');return res.send('erreur')}
    if(result) console.log(result);
    res.send(result[0])
  });



})



app.listen(8000,()=>{
    console.log('server is running on port 8000');
})