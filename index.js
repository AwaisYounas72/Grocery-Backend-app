import  express from "express";
import ConnectToDb from "./ConnectToDb.js";
import  Grocery  from "./Routes/Grocery.Route.js"; 
import cors from "cors";
import bodyParser from "body-parser";
 
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/',Grocery );
ConnectToDb();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})