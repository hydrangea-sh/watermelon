import { Client, GatewayIntentBits } from "discord.js";
import { Elysia } from "elysia";
import { setListeners } from "./utils/listeners";
import { log } from "./utils/logger";

async function startDiscordBot() {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent,
		],
	});

	try {
		log.info("Discord bot is starting.");
		await setListeners(client);
		await client.login(Bun.env.DISCORD_TOKEN);
		log.success("Discord bot is successfully logged in and initialized.");
	} catch (error) {
		log.error("Error initializing Discord bot:", error);
		throw error;
	}
}

async function startElysiaServer() {
	log.info("Elysia server is starting.");
	const app = new Elysia();
	app.listen(Bun.env.PORT || 3000, () => {
		log.success(`Elysia server successfully started on port ${Bun.env.PORT}.`);
	});
}

async function main() {
	try {
		await startDiscordBot();
		await startElysiaServer();
	} catch (error) {
		log.error("An error occurred during initialization:", error);
	}
}

main();
