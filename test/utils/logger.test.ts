import { afterEach, beforeEach, expect, mock, test } from "bun:test";
import { type Log, log } from "../../src/utils/logger";

let originalConsole: Log;

beforeEach(() => {
	originalConsole = {
		error: console.error,
		success: console.log,
		info: console.info,
		warn: console.warn,
	};

	console.error = mock();
	console.log = mock();
	console.info = mock();
	console.warn = mock();
});

afterEach(() => {
	console.error = originalConsole.error;
	console.log = originalConsole.success;
	console.info = originalConsole.info;
	console.warn = originalConsole.warn;
});

test("log.error logs an error message", () => {
	const testMessage = "Test error message";
	const testError = new Error("Test error detail");
	log.error(testMessage, testError);
	expect(console.error).toHaveBeenCalledWith(`⛔️ ${testMessage}`, testError);
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

test("log.warn logs a warn message", () => {
	const testMessage = "Test warn message";
	const testError = new Error("Test warn detail");
	log.warn(testMessage, testError);
	expect(console.warn).toHaveBeenCalledWith(`🚸 ${testMessage}`, testError);
});
