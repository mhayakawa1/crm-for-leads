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
  getProfiles,
  getRemindersById,
  updateReminders,
  updateProfile,
} from "../services/userService.js";
import supabase from "../config/supabaseClient.js";
import { NextResponse } from "next/server.js";
import sgMail from "@sendgrid/mail";
import { google } from "@ai-sdk/google";
import {
  streamText,
  pipeUIMessageStreamToResponse,
  convertToModelMessages,
} from "ai";
import { z } from "zod";

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
    const { name, email, age, status, sortBy, isAscending, assigned_id } =
      req.query;
    const filters = {
      name: name,
      email: email,
      age: age,
      status: status,
      sortBy: sortBy,
      isAscending: isAscending,
      assigned_id: assigned_id,
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

export const fetchProfiles = async (req, res) => {
  try {
    const profiles = await getProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRemindersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getRemindersById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyReminders = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedReminders = await updateReminders(id, updates);
    if (!updatedReminders || updatedReminders.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedReminders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postEmail = async (req, res) => {
  if (!process.env.SENDGRID_API_KEY) {
    res.status(400).json({ error: "Missing API key" });
  } else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  try {
    const body = await req.body;
    const { to, subject, message, from } = body?.email;

    if (!to || !subject || !message) {
      res
        .status(400)
        .json({ error: "Missing required fields: to, subject, or message" });
    }

    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    if (!fromEmail) {
      res
        .status(500)
        .json({ error: "Server misconfiguration: Sender email missing" });
    }
    const { sub, name, email } = from;
    const text = message.replace(/(\r\n|\n|\r)/g, "<br />");
    const emailMessage = {
      to,
      from: fromEmail.toString(),
      subject: subject,
      text: text,
      html: `<p><span>From: ${name} (${email})</span><br />${text}</p>`,
    };

    await sgMail.send(emailMessage);
    const newHistory = [emailMessage, ...body.email_history];
    const updatedEmails = await updateProfile(sub, {
      email_history: newHistory,
    });
    if (!updatedEmails || updatedEmails.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const runtime = "edge";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  try {
    const { messages } = req.body;
    const modelMessages = await convertToModelMessages(messages);
    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: modelMessages,
    });

    const uiStream = result.toUIMessageStream();

    await pipeUIMessageStreamToResponse({
      response: res,
      stream: uiStream,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Internal processing crash",
        details: error.message,
      });
    }
  }
}
