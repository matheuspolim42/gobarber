import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../../../config/authConfig";
import AppError from "../../../errors/AppError";

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default async function evanueAuthentication(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError(401, "JWT token is missing");
	}

	const [, token] = authHeader.split(" ");

	try {
		const decoded = verify(token, authConfig.jwt.secretKey);

		const { sub } = decoded as TokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch {
		throw new Error("Invalid JWT token");
	}
}
