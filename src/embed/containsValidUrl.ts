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
