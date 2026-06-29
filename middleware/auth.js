import supabase from "../config/supabaseClient.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
  const user = await supabase.auth.getUser(token);
  try {
    req.user = user;
    next();
  } catch {
    return res.status(403).send("User not verified.");
  }
};
