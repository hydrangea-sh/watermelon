import { expect, mock, test } from "bun:test";
import { log } from "../../src/utils/logger";

globalThis.console = {
	...console,
	error: mock(),
	log: mock(),
	info: mock(),
	warn: mock(),
};

test("log.error logs an error message", () => {
	const testMessage = "Test error message";
	const testError = new Error("Test error detail");
	log.error(testMessage, testError);
	expect(console.error).toHaveBeenCalledWith(`⛔️ ${testMessage}`, testError.message);
});

test("log.success logs a success message", () => {
	const testMessage = "Test success message";
	log.success(testMessage);
	expect(console.log).toHaveBeenCalledWith(`✅ ${testMessage}`);
});

test("log.info logs an info message", () => {
	const testMessage = "Test info message";
	log.info(testMessage);
	expect(console.info).toHaveBeenCalledWith(`📝 ${testMessage}`);
});

test("log.warn logs an error message", () => {
	const testMessage = "Test error message";
	const testError = new Error("Test error detail");
	log.warn(testMessage, testError);
	expect(console.warn).toHaveBeenCalledWith(`🚸 ${testMessage}`, testError.message);
});

