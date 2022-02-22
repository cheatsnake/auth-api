import { REGISTER_DATA, USER_TABLE } from "../constants/database.constants";
import pool from "../configs/postgresql.config";
import { UserLoginDto, UserRegisterDto } from "../dto/user.dto";
import { Roles } from "../types";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { addSlots } from "../helpers";
import jwtUtil from "../utils/jwt.util";
import tokenService from "./token.service";
import mailUtil from "../utils/mail.util";
import ErrorUtil from "../utils/error.util";
import {
    BAD_ACTIVATION,
    EXIST_USERNAME,
    USED_EMAIL,
    WRONG_PASSWORD,
    WRONG_USERNAME,
} from "../constants/error.constants";

class AuthService {
    async register(dto: UserRegisterDto) {
        try {
            const checkUsername = await pool.query(
                `SELECT * FROM ${USER_TABLE} WHERE username = $1`,
                [dto.username]
            );
            if (checkUsername.rows.length)
                throw ErrorUtil.BadRequest(EXIST_USERNAME);

            const checkEmail = await pool.query(
                `SELECT * FROM ${USER_TABLE} WHERE email = $1`,
                [dto.email]
            );
            if (checkEmail.rows.length) throw ErrorUtil.BadRequest(USED_EMAIL);

            const passwordHash = await bcrypt.hash(dto.password, 7);
            const activationLink = uuidv4();

            const user = await pool.query(
                `INSERT INTO ${USER_TABLE} ${REGISTER_DATA} VALUES ${addSlots(
                    8
                )} RETURNING *`,
                [
                    dto.username,
                    dto.firstName,
                    dto.lastName,
                    dto.email,
                    passwordHash,
                    false,
                    activationLink,
                    Roles.USER,
                ]
            );
            await mailUtil.sendActivationMail(
                dto.email,
                `${process.env.API_URL}/auth/activate/${activationLink}`
            );

            const tokens = jwtUtil.generateTokens({
                id: user.rows[0].id,
                email: dto.email,
                isActivated: user.rows[0].is_activated,
                role: user.rows[0].role_id,
            });

            await tokenService.saveToken(user.rows[0].id, tokens.refreshToken);

            return { ...user.rows[0], ...tokens };
        } catch (error) {
            throw error;
        }
    }

    async login(dto: UserLoginDto) {
        const user = await pool.query(
            `SELECT * FROM ${USER_TABLE} WHERE username = $1`,
            [dto.username]
        );
        if (!user.rows[0]) {
            throw ErrorUtil.BadRequest(WRONG_USERNAME);
        }

        const checkPassword = await bcrypt.compare(
            dto.password,
            user.rows[0].password_hash
        );
        if (!checkPassword) {
            throw ErrorUtil.BadRequest(WRONG_PASSWORD);
        }

        const tokens = jwtUtil.generateTokens({
            id: user.rows[0].id,
            email: user.rows[0].email,
            isActivated: user.rows[0].is_activated,
            role: user.rows[0].role_id,
        });

        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken);

        return { ...user.rows[0], ...tokens };
    }

    async logout(refreshToken: string) {
        await tokenService.removeToken(refreshToken);
    }

    async activate(activationLink: string) {
        const user = await pool.query(
            `SELECT * FROM ${USER_TABLE} WHERE activation_link = $1`,
            [activationLink]
        );
        if (!user.rows.length) throw ErrorUtil.BadRequest(BAD_ACTIVATION);

        await pool.query(
            `UPDATE ${USER_TABLE} SET is_activated = $1 WHERE activation_link = $2`,
            [true, activationLink]
        );
    }
}

export default new AuthService();
