import { readdirSync } from "fs";
import { join } from "path";
import {
	Client,
	Collection,
	ContextMenuCommandBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { log } from "../utils/logger";

export const commands = new Collection<
	string,
	[SlashCommandBuilder | ContextMenuCommandBuilder, ClientAction]
>();

function getFiles(dir: string): string[] {
	const files = readdirSync(dir, { withFileTypes: true });
	const filePaths: string[] = [];

	for (const file of files) {
		if (file.isDirectory()) {
			filePaths.push(...getFiles(join(dir, file.name)));
		} else if (file.name.endsWith(".ts")) {
			filePaths.push(join(dir, file.name));
		}
	}

	return filePaths;
}

export async function setListeners(client: Client) {
	const files = getFiles(join(process.cwd(), "src/listeners"));
	log.info(`Current directory is ${join(process.cwd(), "src/listeners")}`);

	for (const file of files) {
		const { on, action }: ClientEvent = await import(file);

		const isSlashCommand = on instanceof SlashCommandBuilder;
		const isContextCommand = on instanceof ContextMenuCommandBuilder;

		if (typeof on !== "string" && !isSlashCommand && !isContextCommand) {
			throw new TypeError(
				`Command at "${file}" is missing or is not exporting the "on" listener data`,
			);
		}

		if (typeof action !== "function") {
			throw new TypeError(
				`Command at "${file}" is missing or is not exporting the "action" function`,
			);
		}

		log.info(`Loaded ${file}`);

		if (isSlashCommand || isContextCommand) {
			commands.set(on.name, [on, action]);
			continue;
		}

		client.on(on, (x) => {
			action(x).catch((error) => {
				log.error(`Uncaught error at event on file "${file}"`);
				log.error(error);
			});
		});
	}
}
