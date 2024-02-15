import { Events, type Interaction } from "discord.js";
import { commands } from "../../utils/listeners";
import { log } from "../../utils/logger";

export const on = Events.InteractionCreate;

export const action: Action<Interaction> = async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName);
	if (!command?.length) {
		log.warn(`Command with name "${interaction.commandName}" was not found!`);
		return;
	}

	const [data, action] = command;

	await action(interaction).catch((error) => {
		log.error(`Uncaught error at command "${data.name}"`, error);
	});
};
