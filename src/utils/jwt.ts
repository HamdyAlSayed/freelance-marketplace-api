import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthUserPayload, UserRole } from "../types/express";

const DEFAULT_JWT_SECRET = "default_jwt_secret_key_12345";
const DEFAULT_JWT_EXPIRES_IN = "7d";

export interface DecodedToken extends JwtPayload {
  id: string;
  role: UserRole;
}

/**
 * Generates a signed JWT token containing user id and role
 */
export const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  const payload = {
    id: userId,
    role,
  };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || DEFAULT_JWT_EXPIRES_IN) as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

/**
 * Decodes and verifies a JWT token
 */
export const verifyToken = (token: string): DecodedToken => {
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  return jwt.verify(token, secret) as DecodedToken;
};
