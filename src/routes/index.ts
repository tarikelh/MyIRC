import { express, Router, Request, Response } from "../lib";
import { handleConnection } from "../controllers/auth";
import { sendFileOptions } from "../constants/sendfileoptions";

const router: Router = express.Router();
// Routes
router.post("/connect", handleConnection);

router.get("/login", (request: Request, response: Response) => response.sendFile("login.html", sendFileOptions));
router.get("/", (request: Request, response: Response) => response.sendFile("index.html", sendFileOptions));

export default router;
