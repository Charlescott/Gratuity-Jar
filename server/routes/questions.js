import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.get("/random", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

export default router;
