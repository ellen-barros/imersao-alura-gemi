// Importa o framework Express.js
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Importa a função para conectar ao banco de dados
import conectarAoBanco from "./src/config/dbConfig.js";


// Cria uma aplicação Express.js
const app = express();
app.use(express.static("uploads"))
routes(app)


// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});






