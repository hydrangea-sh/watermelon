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
	await interaction.deferReply();

	try {
		const user = interaction.options.getUser("user");
		if (!user) {
			await interaction.followUp("Please mention a valid user.");
			return;
		}

		const gifBuffer = await createPatGif(user);

		const patMessage = `${interaction.user.displayName} pats ${user}`;

		await interaction.followUp({
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
		await interaction.followUp("An error occurred while creating the GIF.");
	}
};
