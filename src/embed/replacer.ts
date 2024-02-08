import { platforms } from "./platforms";

export const replacer = (content: string): string => {
	let updatedContent = content;
	for (const platform of platforms) {
		const matches = updatedContent.match(platform.pattern);
		if (matches) {
			for (const url of matches) {
				updatedContent = updatedContent.replace(url, platform.replacement(url));
			}
		}
	}
	return updatedContent;
};
