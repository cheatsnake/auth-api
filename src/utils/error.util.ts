import { UNAUTHORIZED } from "../constants/error.constants";

class ErrorUtil extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizeError() {
        return new ErrorUtil(401, UNAUTHORIZED);
    }

    static BadRequest(message: string, errors = []) {
        return new ErrorUtil(400, message, errors);
    }
}

export default ErrorUtil;
