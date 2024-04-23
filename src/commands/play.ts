import {
	type ApplicationCommandOptionChoiceData,
	AutocompleteInteraction,
	SlashCommandBuilder,
} from "discord.js";

export const on = new SlashCommandBuilder()
	.setName("play")
	.setDescription("play the song you want")
	.addStringOption((option) =>
		option
			.setName("query")
			.setDescription("Spotify URL, YouTube URL, or search query")
			.setRequired(true),
	);

export const action: Action<SlashCommand> = async (interaction) => {};
