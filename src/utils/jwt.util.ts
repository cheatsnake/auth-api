import "dotenv/config";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";

class JwtUtil {
    generateTokens(payload: TokenPayload) {
        const accessToken = jwt.sign(
            payload,
            String(process.env.JWT_ACCESS_SECRET),
            {
                expiresIn: "1h",
            }
        );

        const refreshToken = jwt.sign(
            payload,
            String(process.env.JWT_REFRESH_SECRET),
            {
                expiresIn: "30d",
            }
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token: string) {
        try {
            const userData: TokenPayload = jwt.verify(
                token,
                String(process.env.JWT_ACCESS_SECRET)
            ) as TokenPayload;

            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string): TokenPayload | null {
        try {
            const userData: TokenPayload = jwt.verify(
                token,
                String(process.env.JWT_REFRESH_SECRET)
            ) as TokenPayload;

            return userData;
        } catch (error) {
            return null;
        }
    }
}

export default new JwtUtil();
