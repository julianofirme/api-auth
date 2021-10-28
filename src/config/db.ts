import { createConnection } from "typeorm";

export const connectToDb = async () => {
  const connect = await createConnection();
  console.log(`:::App connect to db -> ${connect.options.database}`);

  process.on("SIGINT", () => {
    connect.close().then(() => console.log("Db connection closed"));
  });
};
