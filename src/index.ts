import { Client, GatewayIntentBits } from "discord.js";
import { setListeners } from "./utils/listeners";
import { log } from "./utils/logger";

log.success(`"DISCORD_TOKEN" environment variable is set correctly!`);

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

try {
	await setListeners(client);
	await client.login(Bun.env.DISCORD_TOKEN);
} catch (error) {
	log.error("Error loading commands and/or starting client", error);
}
