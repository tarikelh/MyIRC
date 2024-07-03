// Modules
import { http, HTTPServer, express, Express, Server, path  } from "./lib";
import { ServerHandler } from "./@types/socketio";
import "./config/env.config";
import "./config/db.config";
import router from "./routes";
import { onConnection } from "./listeners/socketio";

// Variables globales
const app: Express = express();
const httpServer: HTTPServer = http.createServer(app);
const io = new Server<ServerHandler>(httpServer);

// IO
const connection = onConnection(io)
io.on("connection", connection);

// Mise en place du chemin static
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use("/", router);

export { app, httpServer, HTTPServer };
