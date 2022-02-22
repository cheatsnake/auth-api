import { addSlots } from "../helpers";
import pool from "../configs/postgresql.config";
import {
    TOKEN_TABLE,
    TOKEN_DATA,
    USER_TABLE,
} from "../constants/database.constants";
import jwtUtil from "../utils/jwt.util";
import ErrorUtil from "../utils/error.util";

class TokenService {
    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await pool.query(
            `SELECT * FROM ${TOKEN_TABLE} WHERE user_id = $1`,
            [userId]
        );
        if (tokenData.rows.length) {
            await pool.query(
                `UPDATE ${TOKEN_TABLE} SET refresh_token = $1 WHERE user_id = $2`,
                [refreshToken, userId]
            );
            return;
        }

        const token = await pool.query(
            `INSERT INTO ${TOKEN_TABLE} ${TOKEN_DATA} VALUES ${addSlots(2)}`,
            [userId, refreshToken]
        );

        return token.rows[0];
    }

    async findToken(refreshToken: string) {
        const tokenData = await pool.query(
            `SELECT * FROM ${TOKEN_TABLE} WHERE refresh_token = $1`,
            [refreshToken]
        );

        return tokenData.rows[0];
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) throw ErrorUtil.UnauthorizeError();

        const userData = jwtUtil.validateRefreshToken(refreshToken);
        const tokenData = await this.findToken(refreshToken);

        if (!userData || !tokenData) {
            throw ErrorUtil.UnauthorizeError();
        }

        const user = await pool.query(
            `SELECT * FROM ${USER_TABLE} WHERE id = $1`,
            [userData.id]
        );

        const tokens = jwtUtil.generateTokens({
            id: user.rows[0].id,
            email: user.rows[0].email,
            isActivated: user.rows[0].is_activated,
            role: user.rows[0].role_id,
        });

        await pool.query(
            `UPDATE ${TOKEN_TABLE} SET refresh_token = $1 WHERE id = $2`,
            [refreshToken, user.rows[0].id]
        );

        return { ...user.rows[0], ...tokens };
    }

    async removeToken(refreshToken: string) {
        await pool.query(
            `DELETE FROM ${TOKEN_TABLE} WHERE refresh_token = $1`,
            [refreshToken]
        );
    }
}

export default new TokenService();
