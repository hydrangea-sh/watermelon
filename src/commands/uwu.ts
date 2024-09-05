import { SlashCommandBuilder } from "discord.js";
import Uwuifier from "uwuifier";

const uwuifier = new Uwuifier({
	spaces: {
		faces: 0.2,
		actions: 0.025,
		stutters: 0.05,
	},
	words: 0.5,
	exclamations: 0.5,
});

export const on = new SlashCommandBuilder()
	.setName("uwu")
	.setDescription("UwU-ify your message")
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("Message to uwu-ify")
			.setRequired(true),
	);

export const action: Action<SlashCommand> = async (interaction) => {
	const message = interaction.options.getString("message", true);

	await interaction.reply(`${uwuifier.uwuifySentence(message)}`);
};
