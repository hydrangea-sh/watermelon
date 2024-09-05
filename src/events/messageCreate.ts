import { Events, type Message } from "discord.js";
import { containsValidUrl } from "../services/embedService";
import { replacer } from "../services/embedService";
import { log } from "../utils/logger";

export const on = Events.MessageCreate;

export const action: Action<Message> = async (message) => {
	if (message.author.bot) return;
};
