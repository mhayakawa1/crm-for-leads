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
  const { data, error, query } = await supabase.from("users").select("*");
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
  const { name, email, age, status, sortBy, isAscending, assigned_id } =
    filters;
  let query = supabase.from("users").select("*");

  if (sortBy) {
    query = query.order(sortBy, { ascending: JSON.parse(isAscending) });
  }

  if (name) {
    query = query.ilike("name", `%${name}%`);
  }

  if (email) {
    query = query.ilike("email", `%${email}%`);
  }

  if (status) {
    query = query.ilike("status", `%${status}%`);
  }

  if (assigned_id) {
    query = query.eq("assigned_to->>id", assigned_id);
  }
  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
};

export const getSortedUsers = async (filters) => {
  let query = supabase.from("users").select("*");
  if (filters.name) {
    query = query.ilike("name", `%${filters.name}%`);
  }

  if (filters.email) {
    query = query.ilike("name", `%${filters.email}%`);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.created_at) {
    query = query.eq("created_at", filters.created_at);
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

export const getProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const updateProfile = async (id, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getRemindersById = async (id) => {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateReminders = async (id, updates) => {
  const { data, error } = await supabase
    .from("reminders")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
