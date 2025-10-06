const mysql=require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2001HAJHOUJREALMADRID$$$$',
  database: 'database2'
});




connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :'+err.stack);
    process.exit(1);
  }
  console.log('Connecté à la base de données MySQL avec l’ID', connection.threadId);
});

module.exports = connection;