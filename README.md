# MISSA Backend

Este é o backend do projeto **MISSA** (Museu da Imagem e do Som de Sabinópolis), desenvolvido com **Node.js**, **Express** e **MongoDB** (via Mongoose).

## 📦 Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- CORS

## 📁 Estrutura de Pastas

backend/
├── models/ # Modelos Mongoose (MongoDB)
├── routes/ # Rotas da API
├── .env # Variáveis de ambiente
├── server.js # Ponto de entrada da aplicação
├── package.json # Dependências e scripts


## ▶️ Executar o servidor

1. Instalar dependências:

```bash
npm install

PORT=3000
MONGO_URI=mongodb://localhost:27017/missa
PORT=3000

Iniciar o frontend:

bash
Copiar
Editar
npm start
O app estará disponível em http://localhost:3000

🔗 Integração com Backend
Certifique-se de que o backend está rodando em http://localhost:3000 ou ajuste as URLs no arquivo de serviços (por exemplo, src/services/api.js).

📌 Funcionalidades previstas
Listagem de acervos

Cadastro e edição de usuários

Integração com base de dados do MongoDB via backend

yaml




---


