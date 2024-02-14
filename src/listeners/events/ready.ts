import { type Client, Events, Routes } from "discord.js";
import { commands } from "../../utils/listeners";
import { log } from "../../utils/logger";

export const on = Events.ClientReady;

export const action: Action<Client<true>> = async (client) => {
	client.rest
		.put(Routes.applicationCommands(client.user.id), {
			body: commands.map(([data]) => data.toJSON()),
		})
		.then(() => {
			log.success(`Logged in as "${client.user.tag}"`);
			log.success(
				`Ready! Invite the bot with https://discordapp.com/oauth2/authorize?client_id=${
					client.user.id ?? ""
				}&scope=bot%20applications.commands&permissions=3173376`,
			);
		})
		.catch((error) => {
			log.error("There was an error uploading commands to Discord API", error);
		});
};
