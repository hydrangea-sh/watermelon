export const log = {
  error(message: unknown) {
    console.error(`⛔️ ${message}`);
  },
  success(message: unknown) {
    console.log(`✅ ${message}`);
  },
  info(message: unknown) {
    console.info(`️📝 ${message}`);
  },
  warn(message: unknown) {
    console.warn(`⚠️ ${message}`);
  },
};
