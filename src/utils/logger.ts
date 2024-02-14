export const log = {
	error(message: string, error?: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Non-Error object thrown";
		console.error(`⛔️ ${message}`, errorMessage);
	},
	success(message: string) {
		console.log(`✅ ${message}`);
	},
	info(message: string) {
		console.info(`📝 ${message}`);
	},
	warn(message: string, error?: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Non-Error object thrown";
		console.warn(`🚸 ${message}`, errorMessage);
	},
};
