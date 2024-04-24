import { Events, type Message } from "discord.js";
import { containsValidUrl } from "../services/embedService";
import { replacer } from "../services/embedService";
import { log } from "../utils/logger";

export const on = Events.MessageCreate;

export const action: Action<Message> = async (message) => {
	if (message.author.bot) return;

	//Social media link replacer
	if (containsValidUrl(message.content)) {
		const updatedContent = replacer(message.content);

		if (message.content !== updatedContent) {
      const attribution = `*Posted by <@${message.author.id}>*`;
			const newMessageContent = `${updatedContent}\n${attribution}`;

			await message.channel.send(newMessageContent);

			await message.delete().catch((error) => {
				// The message was not found
				if (error.code === 10008) {
					log.warn("Failed to delete the message:", error);
				}
			});
		}
	}
};
