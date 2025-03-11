import { UnipileClient } from "unipile-node-sdk";

export function unipileClient() {
  const client = new UnipileClient(
    process.env.UNIPILE_API_URL,
    process.env.UNIPILE_API_TOKEN
  );
  return client;
}
