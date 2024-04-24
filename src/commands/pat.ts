import { SlashCommandBuilder } from "discord.js";
import { createPatGif } from "../services/patService";
import { log } from "../utils/logger";

export const on = new SlashCommandBuilder()
	.setName("pat")
	.setDescription("Pat a user")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User you want to pat")
			.setRequired(true),
	);

export const action: Action<SlashCommand> = async (interaction) => {
	log.error(`sadsadsadsadsadsa fucking shit why${await createPatGif()}`);
};
