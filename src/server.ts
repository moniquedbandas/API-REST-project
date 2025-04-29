import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes/index";
import { AppError } from "./utils/app-error";
//como esta usando o TS, nao precisa colocar a extensão

const PORT = 3333;
const app = express();
//estou inicializando o express e colocando dentro da constante app todos os recursos que vamos ter diposniveis do express.
app.use(express.json());

app.use(routes);
//esse abaixo é meu middleware global. so é global qdo TODAS as rotas podem usa-lo
// app.use(myMiddleware);
//todas as rotas utilizarão esse middleware se for colocado antes de todas elas. "A ordem importa."

/*
erros:
-erros do cliente -> 400 bad request
-erros do servidor -> 500 erro interno do servidor
*/
app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    response.status(500).json({ message: error.message });
  }
);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
