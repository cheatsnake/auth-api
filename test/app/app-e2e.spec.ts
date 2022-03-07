import request from "supertest";
import app from "../../src/app";
import { FORBIDDEN } from "../../src/constants/error.constants";
import { UserRegisterDto } from "../../src/dto/user.dto";

const userDto: UserRegisterDto = {
    username: Math.random().toString(),
    firstName: "test",
    lastName: "test",
    email: `${Math.random().toString()}@test.com`,
    password: "test",
};
let token: string;

describe("App module", () => {
    beforeAll(async () => {
        const registerResponse = await request(app)
            .post("/auth/register")
            .send(userDto);

        await request(app).get(
            `/auth/activate/${registerResponse.body.activation_link}`
        );

        const loginResponse = await request(app)
            .post("/auth/login")
            .send(userDto);

        token = loginResponse.body.accessToken;
    });

    test("GET /public - get a public data", async () => {
        const response = await request(app).get("/public");

        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toEqual("This text can be read by anyone");
    });

    test("GET /guest - get a guest data", async () => {
        const response = await request(app)
            .get("/guest")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toEqual(
            "This text can be read by all registered users"
        );
    });

    test("GET /protected - get a guest data", async () => {
        const response = await request(app)
            .get("/protected")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toEqual(
            "This text can only be read by users with verified email"
        );
    });

    test("GET /admin - get an admin data", async () => {
        const response = await request(app)
            .get("/admin")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(403);
        expect(response.body.message).toEqual(FORBIDDEN);
    });
});
