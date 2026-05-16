import supabase from "../config/supabaseClient.js";
import { NextResponse } from "next/server.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.log("Request blocked: No cookie header present.");
      return res
        .status(401)
        .json({ message: "Not authorized, cookies missing" });
    }

    req.token = token;
    return next();
  } catch (error) {
    console.error("Middleware system crash:", error);
    return res.status(401).json({ message: "Internal authorization error" });
  }
};

export const config = {
  matcher: ["/dashboard"],
};
