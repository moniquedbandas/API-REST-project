import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { z } from "zod";

class ProductsController {
  /*
index- get para listar varios registros
show - get para exibir um registro especifico
create - post para criar um registro
update - put para atualizar um registro
remove - delete para deletar um registro
*/
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    response.send(`Página ${page} de ${limit}`);
  }
  create(request: Request, response: Response) {
    // const { name, price } = request.body;

    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(6, { message: "Nome tem que ter mais de 6 caracteres." }),
      price: z
        .number({ required_error: "Price is required" })
        .positive({ message: "Preço tem que ser positivo." }),
      // price: z.number().nullish(), aqui o preço ficara opcional
    });

    const { name, price } = bodySchema.parse(request.body);
    /*
    if (!name) {
      throw new AppError("Nome do produto é obrigatório!");
    }
    if (name.trim().length < 6) {
      throw new AppError("Nome precisa ter no minimo 6 caracteres");
    }
    if (!price) {
      throw new AppError("Preço do produto é obrigatório!");
    }
    if (price < 0) {
      throw new AppError("Preço tem que ser maior que zero.");
    }
      */
    //throw new Error("Erro ao tentar criar um produto.");
    // throw new AppError("Erro ao tentar criar um produto.");
    response.status(201).json({ name, price, user_id: request.user_id });
  }
}

export { ProductsController };
