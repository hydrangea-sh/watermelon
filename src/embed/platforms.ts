interface Platform {
	name: string;
	pattern: RegExp;
	replacement: (url: string) => string;
}

export const platforms: Platform[] = [
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
