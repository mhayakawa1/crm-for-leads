import {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  searchUsers,
  getFilteredUsers,
  getSortedUsers,
  loginUser,
  registerUser,
} from "../services/userService.js";
import supabase from "../config/supabaseClient.js";

export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const { name, email, age, assigned_to, status, sortBy, isAscending } =
      req.query;
    const filters = {
      name: name,
      email: email,
      age: age,
      assigned_to: assigned_to,
      status: status,
      sortBy: sortBy,
      isAscending: isAscending,
    };
    const users = await getFilteredUsers(filters);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const users = await searchUsers(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
    const data = await registerUser(email, password, { name, age });

    res.status(201).json({
      success: true,
      message: "Check your email for a confirmation link!",
      user: data.user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({
      success: true,
      token: data.session.access_token,
      user: data.user,
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout successful. Client-side session cleared.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
