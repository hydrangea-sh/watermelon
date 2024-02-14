export const log = {
	error(message: string, error?: Error) {
		console.error(`⛔️ ${message}`, error ? error.message : "");
	},
	success(message: string) {
		console.log(`✅ ${message}`);
	},
	info(message: string) {
		console.info(`📝 ${message}`);
	},
	warn(message: string, warning?: Error) {
		console.warn(`🚸 ${message}`, warning ? warning.message : "");
	},
};
