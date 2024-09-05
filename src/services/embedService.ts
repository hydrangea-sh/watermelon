interface Platform {
	name: string;
	pattern: RegExp;
	replacement: (url: string) => string;
}

const platforms: Platform[] = [
	{
		name: "Instagram",
		pattern: /(https?:\/\/([a-zA-Z0-9-]+\.)?instagram\.[^?]+)/g,
		replacement: (url) => url.replace("instagram.", "ddinstagram."),
	},
	{
		name: "Threads",
		pattern: /(https?:\/\/([a-zA-Z0-9-]+\.)?threads\.[^?]+)/g,
		replacement: (url) => url.replace("threads.", "vxthreads."),
	},
	{
		name: "TikTok",
		pattern: /(https?:\/\/([a-zA-Z0-9-]+\.)?tiktok\.[^?]+)/g,
		replacement: (url) => url.replace("tiktok.", "vxtiktok."),
	},
	{
		name: "Twitter",
		pattern: /(https?:\/\/([a-zA-Z0-9-]+\.)*(twitter|x)\.[a-zA-Z0-9-]+[^?]+)/g,
		replacement: (url) => url.replace(/(twitter|x)\./, "fxtwitter."),
	},
	{
		name: "Bluesky",
		pattern: /(https?:\/\/([a-zA-Z0-9-]+\.)?bsky\.app[^?]+)/g,
		replacement: (url) => url.replace("bsky.", "psky."),
	},
	{
		name: "Reddit",
		pattern: /(https?:\/\/([a-zA-Z0-9-]+\.)?reddit\.[a-zA-Z0-9-]+[^?]+)/g,
		replacement: (url) => url.replace("reddit.", "rxddit."),
	},

	// Add other platforms here following the same structure
];

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

export const containsValidUrl = (text: string): boolean => {
	const urlPattern = /https?:\/\/[^\s]+/g;
	const potentialUrls = text.match(urlPattern);

	if (!potentialUrls) {
		return false;
	}

	for (const url of potentialUrls) {
		try {
			new URL(url);
			return true;
		} catch (error) {}
	}

	return false;
};
