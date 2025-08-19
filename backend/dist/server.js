"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const clientRoute_1 = __importDefault(require("./routes/clientRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const path_1 = __importDefault(require("path"));
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
//middleware
//app.use(express.static(path.join(__dirname, "../public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "/public"))); //for server side
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.use(body_parser_1.default.text({ limit: "200mb" }));
app.use(body_parser_1.default.urlencoded());
app.use(express_1.default.json());
app.use("/api", clientRoute_1.default);
app.use("/api/admin", adminRoute_1.default);
app.use(errorHandler_1.default);
//connect to bd
(0, database_1.connectDB)();
//lancer le swagger
(0, swagger_1.default)(app, port);
//start server
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
