const http = require('http');
const app = require('./app');
const db = require('./db.config');


app.set('port', process.env.PORT || process.env.D_PORT);
const server = http.createServer(app);


db.authenticate()
    .then(console.log("Database connexion is OK (" + process.env.DB_PORT + ")"))
    .then(server.listen(process.env.S_PORT || process.env.D_PORT, () => {
        console.log("Server is running on port: " + server.address().port)
    }))
    .catch(error => console.log(error))
