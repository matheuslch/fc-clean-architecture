import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductsUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDTO } from "../../../usecase/product/create/create.product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
	const usecase = new CreateProductUseCase(new ProductRepository());
	try {
		const productDto: InputCreateProductDTO = {
			type: req.body.type,
			name: req.body.name,
			price: req.body.price,
		};
		const output = await usecase.execute(productDto);
		res.status(201).send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});

productRoute.get("/", async (req: Request, res: Response) => {
	const usecase = new ListProductsUseCase(new ProductRepository());
	try {
		const output = await usecase.execute({});
		res.send(output);
	} catch (error) {
		res.status(500).send(error);
	}
});
