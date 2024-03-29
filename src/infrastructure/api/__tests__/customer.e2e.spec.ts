import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Matheus",
                address: {
                    street: "Rua 1",
                    city: "Caconde",
                    number: 123,
                    zip: "13770000",
                },
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Matheus");
        expect(response.body.address.street).toBe("Rua 1");
        expect(response.body.address.city).toBe("Caconde");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("13770000");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Matheus",
            });
        expect(response.status).toBe(500);
    });

    it("should list all customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Matheus",
                address: {
                    street: "Rua 1",
                    city: "Caconde",
                    number: 123,
                    zip: "13770000",
                },
            });
        expect(response.status).toBe(201);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Luiz",
                address: {
                    street: "Rua 2",
                    city: "São Carlos",
                    number: 123,
                    zip: "13770000",
                },
            });
        expect(response2.status).toBe(201);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("Matheus");
        expect(customer.address.street).toBe("Rua 1");

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Luiz");
        expect(customer2.address.street).toBe("Rua 2");

        const listResponseXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Matheus</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Rua 1</street>`);
        expect(listResponseXML.text).toContain(`<city>Caconde</city>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<zip>13770000</zip>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`<name>Luiz</name>`);
        expect(listResponseXML.text).toContain(`<street>Rua 2</street>`);
        expect(listResponseXML.text).toContain(`</customers>`);
    });
});
