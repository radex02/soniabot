import { Hono } from "hono";
import { interactionEntrypoint } from "./interactionEntrypoint";
import { signatureMiddleware } from "./signatureMiddleware";
import { registerCommands } from "./registerCommands";

const app = new Hono();

app.get("/register", registerCommands);

app.use("/", signatureMiddleware);
app.post("/", interactionEntrypoint);

app.fire();
