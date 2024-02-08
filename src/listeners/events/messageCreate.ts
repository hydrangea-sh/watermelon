import { Colors, EmbedBuilder, Message } from "discord.js";
import { replacer } from "../../embed/replacer";
import { log } from "../../utils/logger";

export const on = "messageCreate";

export const action: Action<Message> = async (message) => {
	if (message.author.bot) return;

	const updatedContent = replacer(message.content);

	if (message.content !== updatedContent) {
		try {
			const attribution = `*Posted by ${message.author.tag}.*`;
			const newMessageContent = `${updatedContent}\n${attribution}`;

			await message.channel.send(newMessageContent);

			await message.delete();
		} catch (error) {
			log.error("Error handling message for URL replacement and deletion:");
			log.error(error);

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
};
