import { SlashCommandBuilder } from "discord.js";
import Uwuifier from "uwuifier";

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

	const uwuifier = new Uwuifier({
		spaces: {
			faces: 0.5,
			actions: 0.075,
			stutters: 0.1,
		},
		words: 1,
		exclamations: 1,
	});

	if (!interaction.inGuild()) {
		await interaction.reply(":x: This command can only be run in a server!");
		return;
	}

	if (!interaction.channel) {
		await interaction.reply(
			":x: This command can only be run in a text channel!",
		);
		return;
	}

	await interaction.reply(`${uwuifier.uwuifySentence(message)}`);
};
