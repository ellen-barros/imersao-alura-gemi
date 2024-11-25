import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configuração de opções para o CORS
const corsOptions = {
    origin: "http://localhost:8000", // Define a origem permitida para as requisições
    optionsSuccessStatus: 200 // Define o status de sucesso para opções de pré-verificação
};

// Configuração de armazenamento do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define a pasta de destino para os arquivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Define o nome do arquivo como o nome original
    }
});

// Configuração do multer com o destino e armazenamento definidos
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    // Habilita o processamento de JSON no corpo das requisições
    app.use(express.json());

    // Habilita o CORS com as opções definidas
    app.use(cors(corsOptions));

    // Define uma rota GET para "/posts" para listar todos os posts
    app.get("/posts", listarPosts);

    // Define uma rota POST para "/posts" para criar um novo post
    app.post("/posts", postarNovoPost);

    // Define uma rota POST para "/upload" para fazer upload de uma imagem e criar um novo post
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Define uma rota PUT para "/upload/:id" para atualizar um post existente
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
