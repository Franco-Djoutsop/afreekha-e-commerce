import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import router from "./routes/clientRoute";
import routerAdmin from "./routes/adminRoute";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler";
import path from "path";
import swaggerDocs from "./utils/swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

//middleware
//app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "/public"))); //for server side

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use("/api", router);
app.use("/api/admin", routerAdmin);
  

app.use(errorHandler);

//connect to bd
connectDB();

//lancer le swagger
//swaggerDocs(app, port as number);
//start server
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
