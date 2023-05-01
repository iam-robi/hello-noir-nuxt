//TODO: client side only

import { readdirSync } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  try {
    const files = readdirSync(
      path.resolve(process.cwd(), "../circuits/connectivity")
    );
    // res.status(200).json({ files });
    return { files };
  } catch (error) {
    console.error("Error reading the directory:", error);
    // res.status(500).json({ error: "Error reading the directory" });
  }
});
