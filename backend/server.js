import express from "express"; //module js

const app = express();
app.get("/", (req, res) => {
  res.send("server is ready");
});
const port = process.env.PORT || 3000; //can change later
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
