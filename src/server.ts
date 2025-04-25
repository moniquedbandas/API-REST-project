import express from "express";
import { myMiddleware } from "./middlewares/my-middleware";
//como esta usando o TS, nao precisa colocar a extensão

const PORT = 3333;
const app = express();
//estou inicializando o express e colocando dentro da constante app todos os recursos que vamos ter diposniveis do express.
app.use(express.json());

app.use(myMiddleware);
//todas as rotas utilizarão esse middleware se for colocado antes de todas elas. "A ordem importa."

app.get("/products", (request, response) => {
  const { page, limit } = request.query;
  response.send(`Página ${page} de ${limit}`);
});

app.post("/products", (request, response) => {
  const { name, price } = request.body;
  response.status(201).json({ name, price });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
