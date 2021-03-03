const server = require("../../app");
const request = require("supertest");
const moment = require("moment");

describe('User', () => {
  it("Shoud be able to create new a user", async () => {
    const response =await request(server).post("/api/registrar").send({
      email: "test@test.com",
      investido: 0,
      patrimonio: 0,
      password: "123",
      nome: "test",
      telefone: "00000000000",
      dataNasc: moment().subtract(10, "days")
    });

    expect(response.status).toBe(200);
  })

  it("Shoud be able to login a user ", async () => {
    const response =await request(server).post("/api/login").send({
      email: 'test@test.com',
      password: '123',
    });

    expect(response.status).toBe(200);
  })
})
