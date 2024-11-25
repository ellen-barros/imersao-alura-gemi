// Importa o módulo GoogleGenerativeAI da biblioteca "@google/generative-ai"
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cria uma instância do GoogleGenerativeAI usando a chave de API armazenada em uma variável de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo generativo específico chamado "gemini-1.5-flash"
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Exporta uma função assíncrona que gera uma descrição para uma imagem usando o modelo Gemini
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt para a geração da descrição
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // Converte a imagem em um formato de string base64 e define o tipo MIME
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Gera o conteúdo (descrição da imagem) usando o modelo Gemini
    const res = await model.generateContent([prompt, image]);

    // Retorna o texto da resposta ou uma mensagem padrão se o texto não estiver disponível
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Exibe uma mensagem de erro no console se ocorrer um problema
    console.error("Erro ao obter alt-text:", erro.message, erro);

    // Lança um erro personalizado se a geração do alt-text falhar
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
