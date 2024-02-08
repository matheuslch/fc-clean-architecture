import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it("should create a product", async () => {
		const response = await request(app)
			.post("/product")
			.send({
				type: "a",
				name: "Product 1",
				price: 15
			});

		expect(response.status).toEqual(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.name).toEqual("Product 1");
		expect(response.body.price).toEqual(15);
	});

	it("should not create a product", async () => {
		const response = await request(app)
			.post("/product")
			.send({
				name: "",
				price: 1
			});
		expect(response.status).toEqual(500);
	});

	it("should list all products", async () => {
		const response = await request(app)
			.post("/product")
			.send({
				type: "a", 
				name: "Product 1", 
				price: 15 
			});
		expect(response.status).toBe(201);
		const response2 = await request(app)
			.post("/product")
			.send({
				type: "b", 
				name: "Product 2", 
				price: 10
			});
		expect(response2.status).toBe(201);

		const listResponse = await request(app).get("/product").send();
		expect(listResponse.status).toBe(200);
		expect(listResponse.body.products.length).toBe(2);

		const product = listResponse.body.products[0];
		expect(product.name).toBe(response.body.name);
		expect(product.price).toBe(response.body.price);
	
		const product2 = listResponse.body.products[1];
		expect(product2.name).toBe(response2.body.name);
		expect(product2.price).toBe(response2.body.price);
	});
});
