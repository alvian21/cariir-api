import { readdir } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import { print } from "./functions/output.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(json({ limit: process.env.JSON_LIMIT }));
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

readdir("./routes", async (err, files) => {
  if (err) return console.error(err);

  var len = files.length;
  var lenX = len - 1;
  var n = 0;

  for (const route of files) {
    if (route.match(".js")) {
      const routeModule = await import(`./routes/${route}`);
      app.use(
        "/" + route.replace(".js", ""),
        routeModule.default || routeModule,
      );

      if (n === lenX) {
        app.use((req, res, next) => {
          return print(req, res, {
            code: "SERVICE_NOT_FOUND",
          });
        });

        app.listen(process.env.PORT, "0.0.0.0", () => {
          return console.log(
            process.env.SERVICE_NAME + " start on port " + process.env.PORT,
          );
        });
      }
    }
    n++;
  }
});
