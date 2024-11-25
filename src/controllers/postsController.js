import { url } from "inspector";
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/gemmiService.js"

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Busca todos os posts
    const posts = await getTodosPosts();

    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        // Cria o novo post
        const postCriado = await criarPost(novoPost);
        // Envia o post criado como resposta JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem de erro no console e envia a resposta de erro com status 500
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

// Função para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        ImgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Cria o novo post com a imagem
        const postCriado = await criarPost(novoPost);
        // Atualiza o caminho da imagem
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia o post criado como resposta JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem de erro no console e envia a resposta de erro com status 500
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

// Função para atualizar um post existente com a imagem e descrição gerada
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    };

    try {
        // Lê o buffer da imagem
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        // Gera a descrição da imagem usando o serviço Gemini
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };
        // Atualiza o post com a nova descrição e imagem
        const postCriado = await atualizarPost(id, post);

        // Envia o post atualizado como resposta JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem de erro no console e envia a resposta de erro com status 500
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}
