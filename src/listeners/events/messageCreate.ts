import { Events, Message } from "discord.js";
import { replacer } from "../../embed/replacer";
import { log } from "../../utils/logger";

export const on = Events.MessageCreate;

export const action: Action<Message> = async (message) => {
	if (message.author.bot) return;
	const updatedContent = replacer(message.content);

	if (message.content !== updatedContent) {
		const attribution = `*Posted by ${message.author.tag}.*`;
		const newMessageContent = `${updatedContent}\n${attribution}`;

		await message.channel.send(newMessageContent);

		await message.delete().catch((error) => {
			//the message was not found
			if (error.code === 10008) {
				log.warn("Failed to delete the message:", error);
			}
		});
	}
};
