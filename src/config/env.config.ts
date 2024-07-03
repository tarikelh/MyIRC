import { dotenv } from "../lib";

const env: string = process.env.NODE_ENV || "development";
const path: string = ".env." + env;

dotenv.config({ path });
console.log("Node environment:", env);
