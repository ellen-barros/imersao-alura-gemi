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

export async function criarPost(novoPost) {
     const db = conexao.db("imersao-gemmi");
     const colecao = db.collection("post");
     return colecao.insertOne(novoPost)
    
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-gemmi");
    const colecao = db.collection("post");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
   
}