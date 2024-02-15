import type {
	ChatInputCommandInteraction,
	ContextMenuCommandBuilder,
	MessageContextMenuCommandInteraction,
	SlashCommandBuilder,
	UserContextMenuCommandInteraction,
} from "discord.js";

declare global {
	interface Response {
		json<T>(): Promise<T>;
	}

	type ClientAction = (x: unknown) => Promise<void>;

	interface ClientEvent {
		on: SlashCommandBuilder | ContextMenuCommandBuilder | string;
		action: ClientAction;
	}

	declare module "bun" {
		interface Env {
			DISCORD_TOKEN: string;
			PORT: string;
		}
	}

	type Action<T> = (x: T) => Promise<void>;

	type SlashCommand = ChatInputCommandInteraction;
	type UserCommand = UserContextMenuCommandInteraction;
	type MessageCommand = MessageContextMenuCommandInteraction;
}
