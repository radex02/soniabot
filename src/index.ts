import { Hono } from "hono";
import { discordInteraction } from "./discordInteraction";
import { signatureMiddleware } from "./signatureMiddleware";
import { registerCommands } from "./registerCommands";

const app = new Hono();

app.get("/register", registerCommands);

app.use("/", signatureMiddleware);
app.post("/", discordInteraction);

app.fire();
