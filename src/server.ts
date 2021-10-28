import { app } from "./app";

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`:::App running on port -> ${PORT}`)
);

process.on("SIGNINT", () => {
  server.close();
  console.log("App finished");
});
