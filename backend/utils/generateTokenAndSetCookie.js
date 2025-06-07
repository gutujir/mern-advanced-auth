import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token will expire in 7 day
  });

  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access to the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie will expire in 7 days
  });

  return token;
};
