import { createClient } from "@/prismicio";

const client = createClient();
export const settings = await client.getSingle("settings");
export const navigation = await client.getSingle("navigation");