import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import router from "./routes/clientRoute";
import routerAdmin from "./routes/adminRoute";
import routeMessage from "./routes/routeMessage";
import routePaiement from "./routes/routePaiement";
import routeCategorie from "./routes/routeCategorie";
import routeSousCategorie from "./routes/routeSousCategorie";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use("/api", router);
app.use("/message", routeMessage);
app.use("/paiement", routePaiement);
app.use("/categorie",routeCategorie);
app.use('/sousCategorie',routeSousCategorie);
app.use("/api/admin", routerAdmin);
app.use(errorHandler);

//connect to bd
connectDB();
//start server
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
