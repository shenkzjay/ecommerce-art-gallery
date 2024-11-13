import jwt from "jsonwebtoken";

export const DecodeUsername = (token: string) => {
  try {
    const decode = jwt.decode(token) as jwt.JwtPayload | null;
    return decode?.userInfo.username || null;
  } catch (error) {
    console.error("failed to decode shit");
    return null;
  }
};
