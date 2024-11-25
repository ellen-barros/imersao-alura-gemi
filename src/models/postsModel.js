import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-gemmi"
    const db = conexao.db("imersao-gemmi");

    // Seleciona a coleção "post"
    const colecao = db.collection("post");

    // Busca todos os posts da coleção e retorna como um array
    return colecao.find().toArray();
}

// Função para criar um novo post
export async function criarPost(novoPost) {
    // Conecta ao banco de dados "imersao-gemmi"
    const db = conexao.db("imersao-gemmi");
    // Seleciona a coleção "post"
    const colecao = db.collection("post");
    // Insere o novo post na coleção e retorna o resultado
    return colecao.insertOne(novoPost);
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoPost) {
    // Conecta ao banco de dados "imersao-gemmi"
    const db = conexao.db("imersao-gemmi");
    // Seleciona a coleção "post"
    const colecao = db.collection("post");
    // Converte o ID para um objeto ObjectId
    const objID = ObjectId.createFromHexString(id);
    // Atualiza o post na coleção com o novo conteúdo e retorna o resultado
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
