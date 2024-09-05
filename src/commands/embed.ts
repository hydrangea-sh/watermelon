import { SlashCommandBuilder } from "discord.js";
import {
	containsValidUrl,
	getSupportedPlatforms,
	isSupportedUrl,
	replacer,
} from "../services/embedService";
import { log } from "../utils/logger";

export const on = new SlashCommandBuilder()
	.setName("embed")
	.setDescription("Post a social media url to a nice embed")
	.addStringOption((option) =>
		option.setName("url").setDescription("Social media url").setRequired(true),
	);

export const action: Action<SlashCommand> = async (interaction) => {
	try {
		const url = interaction.options.getString("url", true);

		if (!containsValidUrl(url)) {
			await interaction.reply({
				content: "Please provide a valid url (e.g., https://instagram.com).",
				ephemeral: true,
			});
			return;
		}
		if (!isSupportedUrl(url)) {
			await interaction.reply({
				content: `Please provide a supported url. \n Supported urls: ${getSupportedPlatforms()}`,
				ephemeral: true,
			});
			return;
		}

		await interaction.reply({
			content: `${replacer(url)}`,
		});
	} catch (error) {
		log.error("Error embedding URL:", error);
		await interaction.reply({
			content: "An error occurred while created the url.",
			ephemeral: true,
		});
	}
};
