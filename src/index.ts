import "reflect-metadata";
import express from "express";
import routes from './routes'

const app = express();
const PORT = 8080

app.use(express.json());
app.use(routes)

app.get("/", (req, res) => {
  res.send("hello")
})

app.listen(PORT, () => console.log(`:::Server run on port: ${PORT}`))