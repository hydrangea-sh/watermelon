export interface Log {
	error(message: string, error?: unknown): void;
	success(message: string): void;
	info(message: string): void;
	warn(message: string, error?: unknown): void;
}

export const log: Log = {
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
