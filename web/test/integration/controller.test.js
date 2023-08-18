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
            const payload = {
                                "current_animation": "spooky_rainbows",
                                "spooky_rainbows": {
                                    "hue_start": 30,
                                    "hue_end": 140,
                                    "speed": 0.3
                                }
                             }
            const response = await request(app)
                .post("/")
                .set("content-type", "application/json")
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
        });

        it("should return 400 and the failed result for empty payload", async () => {
            const response = await request(app)
                .post("/")
                .set("content-type", "application/json")
                .send();

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('success', false);
        });
    });
});