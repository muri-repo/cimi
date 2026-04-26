/**
 * Logger - Simple logging utility
 */

const logger = {
  info: (message) => console.log(`ℹ ${message}`),
  error: (message) => console.error(`✖ ${message}`),
  success: (message) => console.log(`✓ ${message}`),
  warn: (message) => console.warn(`⚠ ${message}`),
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`🔧 ${message}`);
    }
  },
};

export default logger;
