import supabase from "../config/supabaseClient.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  req.user = user;
  next();
};