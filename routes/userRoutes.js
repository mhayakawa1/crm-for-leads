import express from "express";
import { Router } from "express";
import { serialize } from "cookie";
import { createClient } from "@supabase/supabase-js";

import {
  addUser,
  fetchUsers,
  fetchUserById,
  fetchUserByEmail,
  modifyUser,
  removeUser,
  findUsers,
  signUp,
  signIn,
  signOut,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post("/signup", signUp);
router.post(
  "/login",
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return res.status(400).json({ error: error.message });

      const { access_token, refresh_token } = data.session;
      const tokenCookie = serialize("sb-access-token", access_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      const refreshCookie = serialize("sb-refresh-token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      res.setHeader("Set-Cookie", [tokenCookie, refreshCookie]);
      return res.json({
        success: true,
        accessToken: access_token,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  signIn,
);
router.post("/logout", signOut);
router.use(protect);
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the user
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address
 *         age:
 *           type: integer
 *           description: User's age
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the user was created
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         name: John Doe
 *         email: john@example.com
 *         age: 30
 *         created_at: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.post("/users", addUser);
router.get("/users", fetchUsers);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search for users by name
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for user names
 *     responses:
 *       200:
 *         description: List of matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing search query
 *       500:
 *         description: Server error
 */
router.get("/users/search", findUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/users/:id", fetchUserById);
router.put("/users/:id", modifyUser);
router.delete("/users/:id", removeUser);

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email address of the user
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/users/email/:email", fetchUserByEmail);

export default router;
