import supabase from "../config/supabaseClient.js";

export const registerUser = async (email, password, metadata) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: metadata },
  });

  if (error) throw new Error(error.message);
  return data;
};

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data;
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "User deleted successfully" };
};

export const searchUsers = async (query) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw new Error(error.message);
  return data;
};

export const getFilteredUsers = async (filters) => {
  let query = supabase.from("users").select("*");

  if (filters.name) {
    query = query.ilike("name", `%${filters.name}%`);
  }

  if (filters.age) {
    query = query.eq("age", filters.age);
  }

  if (filters.assigned_to) {
    query = query.eq("assigned_to", filters.assigned_to);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) throw new Error("Invalid email or password");

  if (data.password !== password) {
    throw new Error("Invalid email or password");
  }

  return data;
};
