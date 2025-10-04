const express=require("express");
const app=express();
const cors=require('cors')
const conn=require("./basededonnes/db")

app.use(cors());



app.get("/",(req,res)=>{
const sql = 'insert into Admine (nom,prenom,image,motdepasse,email) values ("hajhouj","alaa","image1","gdgdfdf","alaa.spread@gmail.com")';
const sql2="delete from Admine";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de l’exécution de la requête :');
      return res.status(500).send('Erreur serveur');
    }
    console.log("requet passsée avec succes!!!!")
    res.send(results)
  });


})



app.listen(8000,()=>{
    console.log('server is running on port 8000');
})