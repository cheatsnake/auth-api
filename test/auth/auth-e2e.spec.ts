import request from "supertest";
import app from "../../src/app";
import {
    BAD_ACTIVATION,
    EXIST_USERNAME,
    USED_EMAIL,
    WRONG_PASSWORD,
    WRONG_USERNAME,
} from "../../src/constants/error.constants";
import { UserRegisterDto } from "../../src/dto/user.dto";
import { Roles } from "../../src/types";

const userDto: UserRegisterDto = {
    username: Math.random().toString(),
    firstName: "test",
    lastName: "test",
    email: `${Math.random().toString()}@test.com`,
    password: "test",
};

let activateLink: string;

describe("Auth module", () => {
    test("POST /auth/register - register a new user", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send(userDto);

        activateLink = response.body.activation_link;

        expect(response.statusCode).toEqual(201);
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.role_id).toEqual(Roles.USER);
    });

    test("POST /auth/register - register with already used username", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                ...userDto,
                email: `${Math.random().toString()}@test.com`,
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual(EXIST_USERNAME);
    });

    test("POST /auth/register - register with already used email", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({ ...userDto, username: Math.random().toString() });

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual(USED_EMAIL);
    });

    test("POST /auth/login - login to an account", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({ username: userDto.username, password: userDto.password });

        expect(response.statusCode).toEqual(200);
        expect(response.body.username).toEqual(userDto.username);
        expect(response.body.email).toEqual(userDto.email);
    });

    test("POST /auth/login - login with not exist username", async () => {
        const response = await request(app).post("/auth/login").send({
            username: Math.random().toString(),
            password: userDto.password,
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual(WRONG_USERNAME);
    });

    test("POST /auth/login - login with not exist email", async () => {
        const response = await request(app).post("/auth/login").send({
            username: userDto.username,
            password: Math.random().toString(),
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual(WRONG_PASSWORD);
    });

    test("GET /auth/activate/:link - verify email", async () => {
        const response = await request(app)
            .get(`/auth/activate/${activateLink}`)
            .send();

        expect(response.statusCode).toEqual(302);
    });

    test("GET /auth/activate/:link - verify email with wrong activation link", async () => {
        const response = await request(app)
            .get(`/auth/activate/test${activateLink}`)
            .send();

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual(BAD_ACTIVATION);
    });
});
