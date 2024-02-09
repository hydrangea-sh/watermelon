
import { expect, test, mock } from "bun:test";
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
  log.error(testMessage);
  expect(console.error).toHaveBeenCalledWith(`⛔️ ${testMessage}`);
});

test("log.success logs a success message", () => {
  const testMessage = "Test success message";
  log.success(testMessage);
  expect(console.log).toHaveBeenCalledWith(`✅ ${testMessage}`);
});

test("log.info logs an info message", () => {
  const testMessage = "Test info message";
  log.info(testMessage);
  expect(console.info).toHaveBeenCalledWith(`️📝 ${testMessage}`);
});

test("log.warn logs a warning message", () => {
  const testMessage = "Test warning message";
  log.warn(testMessage);
  expect(console.warn).toHaveBeenCalledWith(`⚠️ ${testMessage}`);
});
