import supertest from "supertest";
import app from "../../..";

describe("No controller, ao executar função", () => {
  describe("Create", () => {
    test("Em caso de sucesso, deve retornar 201", async () => {
      const response = await supertest(app).post("/psicologos").send({
        nome: "alo",
        email: "nataldaoui@gmail.com",
        senha: "123",
        apresentacao: "bla bla bla",
        cep: "01001000"
      });

      expect(response.status).toBe(201);
    });

    test("Em caso de sucesso, retornar response do request", async () => {
      const response = await supertest(app).post("/psicologos").send({
        nome: "alo",
        email: "natalsdoasui@gmail.com",
        senha: "123",
        apresentacao: "bla bla bla",
        cep: "01001000"
      });

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          senha: expect.any(String),
          apresentacao: expect.any(String),
          bairro: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String)
        })
      );

      expect(response.body).toEqual(
        expect.objectContaining({
          nome: "alo",
          email: "natalsdoasui@gmail.com",
          apresentacao: "bla bla bla"
        })
      );
    });
  });
});
