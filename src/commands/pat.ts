import { SlashCommandBuilder } from "discord.js";
import { createPatGif } from "../services/patService";

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
	try {
		const user = interaction.options.getUser("user");
		if (!user) {
			await interaction.reply({
				content: "Please mention a valid user.",
				ephemeral: true,
			});
			return;
		}

		const gifBuffer = await createPatGif(user);

		const patMessage = `${interaction.user.displayName} pats ${user}`;

		await interaction.reply({
			content: patMessage,
			files: [
				{
					attachment: gifBuffer,
					name: "pat.gif",
				},
			],
		});
	} catch (error) {
		console.error("Error creating GIF:", error);
		await interaction.reply({
			content: "An error occurred while creating the GIF.",
			ephemeral: true,
		});
	}
};
