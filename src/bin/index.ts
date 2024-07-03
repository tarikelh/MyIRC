import { app, httpServer, HTTPServer } from "../app";

const server: HTTPServer = httpServer;
let port: number | string | boolean = 0;

export default function Server() {
    port = normalizePort(process.env.PORT || 3000);
    app.set("port", port);

    // Lancement de l'application
    server.listen(app.get("port"));
    server.on("error", onError);
    server.on("listening", onListening);
}

function normalizePort(value: string | number): number | string | boolean {
    const port: number = parseInt(value as string, 10);

    if (isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind: string = typeof port === "string" ? "pipe " + port : "port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const address = server.address()!;
    const bind: string = typeof address === "string" ? "pipe " + address : "port " + address.port;
    console.log("Listening on " + bind);
}
