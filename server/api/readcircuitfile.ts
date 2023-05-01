import fs from "fs/promises";

import { readdirSync } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const projectRoot = process.cwd();
    console.log("projectRoot:", projectRoot);
    const filePath = path.join(
      projectRoot,
      "../circuits/connectivity/src",
      body.filename
    );
    console.log("filePath:", filePath);
    const data = await fs.readFile(filePath, "utf-8");
    return data;
    // return data;
    //res.status(200).send(data);
  } catch (error) {
    console.log("Error reading file:", error);
    //res.status(500).send({ error: "Error reading file" });
  }

  //return { hello: "world" };
  // try {
  //   const files = readdirSync(
  //     path.resolve(process.cwd(), "../circuits/connectivity")
  //   );
  //   // res.status(200).json({ files });
  //   return { files };
  // } catch (error) {
  //   console.error("Error reading the directory:", error);
  //   // res.status(500).json({ error: "Error reading the directory" });
  // }
});
