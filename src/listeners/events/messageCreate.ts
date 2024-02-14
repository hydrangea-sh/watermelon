import { Colors, EmbedBuilder, Events, Message } from "discord.js";
import { replacer } from "../../embed/replacer";
import { log } from "../../utils/logger";

export const on = Events.MessageCreate;

export const action: Action<Message> = async (message) => {
	if (message.author.bot) return;
	const updatedContent = replacer(message.content);

	if (message.content !== updatedContent) {
		try {
			const attribution = `*Posted by ${message.author.tag}.*`;
			const newMessageContent = `${updatedContent}\n${attribution}`;

			await message.channel.send(newMessageContent);

			if (await message.channel.messages.fetch(message.id)) {
				await message.delete();
			}
		} catch (error) {
			// Check if error is due to concurrent message deletion
			if (error !== 10008) {
				log.error(
					"Error handling message for URL replacement and deletion:",
					error,
				);
				const embed = new EmbedBuilder()
					.setTitle("Error processing your message")
					.setDescription(
						"There was an error processing your message. Please try again later.",
					)
					.setColor(Colors.Red)
					.setTimestamp(new Date());

				message.channel.send({ embeds: [embed] }).catch(() => {});
			}
		}
	}
};
