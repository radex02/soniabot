import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { verifyKey } from "discord-interactions";

export const signatureMiddleware = async (c: Context, next: () => void) => {
  const signature = c.req.header("X-Signature-Ed25519");
  const timestamp = c.req.header("X-Signature-Timestamp");

  if (!signature || !timestamp) throw new HTTPException(401);

  const rawBody = await c.req.text();

  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    DISCORD_PUBLIC_KEY
  );

  if (isValidRequest) {
    c.set("rawBody", rawBody);
    await next();
  } else {
    throw new HTTPException(401);
  }
};
