import { SignJWT, jwtVerify } from "jose";

const ALG = "HS256";
const TOKEN_NAME = "auth_token";
const TOKEN_MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const secret = process.env.JWT_SECRET || "dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function createSessionJwt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE_SEC}s`)
    .sign(getSecret());
}

export async function verifySessionJwt(token) {
  const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
  return payload;
}

export function getAuthCookieName() {
  return TOKEN_NAME;
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE_SEC,
  };
}

