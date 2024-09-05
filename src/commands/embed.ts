import { SlashCommandBuilder } from "discord.js";
import { containsValidUrl, replacer } from "../services/embedService";

export const on = new SlashCommandBuilder()
	.setName("embed")
	.setDescription("Post a social media url to a nice embed")
	.addStringOption((option) =>
		option
			.setName("url")
			.setDescription("Social media url")
			.setRequired(true),
	);

export const action: Action<SlashCommand> = async (interaction) => {
	const reply = await interaction.deferReply({ fetchReply: true });
	
	try {
		const url = interaction.options.getString("url", true)

		if (!containsValidUrl(url)) {
			await interaction.followUp("Please have a valid url.");
			return;
		}

		await interaction.followUp({
			content: `${replacer(url)}`,
		});

	} catch (error) {
		console.error("Error embedding URL:", error);
		await interaction.followUp("An error occurred while created the url.");
	}
};
