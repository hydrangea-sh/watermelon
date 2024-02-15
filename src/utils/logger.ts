export interface Log {
	error(message: string, error?: unknown): void;
	success(message: string): void;
	info(message: string): void;
	warn(message: string, error?: unknown): void;
}

export const log: Log = {
	error(message: string, error?: unknown) {
		console.error(`⛔️ ${message}`, error);
	},
	success(message: string) {
		console.log(`✅ ${message}`);
	},
	info(message: string) {
		console.info(`📝 ${message}`);
	},
	warn(message: string, error?: unknown) {
		console.warn(`🚸 ${message}`, error);
	},
};
