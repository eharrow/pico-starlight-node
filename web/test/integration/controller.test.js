const request = require("supertest");
const app = require('../../server')

describe("Controller", () => {
    describe("get config", () => {
        it("should return 200 and the web page", async () => {
            const response = await request(app)
                .get("/")
                .send();

            expect(response.status).toBe(200);
            expect(response.text).toContain('<title>Starlight Settings</title>');
        });
    });

    describe("post config", () => {
        it("should return 201 and the result", async () => {
            const response = await request(app)
                .post("/")
                .set("content-type", "application/json")
                .send();

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success');
        });
    });
});