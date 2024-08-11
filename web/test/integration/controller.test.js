const request = require("supertest");
const app = require("../../server");
const fs = require("fs");

describe("Controller", () => {
  beforeEach(() => {
    const payload = {
      "current_animation": "spooky_rainbows",
      "spooky_rainbows": {
        "hue_start": 30,
        "hue_end": 140,
        "speed": 0.3,
      },
    };
    fs.writeFileSync("www/config.json", JSON.stringify(payload));
  });

  describe("get", () => {
    it("should return 200 and the config json", async () => {
      const response = await request(app)
        .get("/config.json")
        .send();

      expect(response.status).toBe(200);
      console.log(response.text);
      expect(response.body).toHaveProperty("current_animation");
    });

    it("should return 200 and the landing page", async () => {
      const response = await request(app)
        .get("/")
        .send();

      expect(response.status).toBe(200);
      expect(response.text).toContain("<title>Starlight Settings</title>");
    });
  });

  describe("post config", () => {
    it("should return 201 and the result", async () => {
      const payload = {
        "current_animation": "spooky_rainbows",
        "spooky_rainbows": {
          "hue_start": 30,
          "hue_end": 140,
          "speed": 0.3,
        },
      };
      const response = await request(app)
        .post("/")
        .set("content-type", "application/json")
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("success", true);
    });

    it("should return 400 and the failed result for empty payload", async () => {
      const response = await request(app)
        .post("/")
        .set("content-type", "application/json")
        .send();

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("reason", "empty payload");
    });
  });
});
