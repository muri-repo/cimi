import { Command } from 'commander';
import logger from '../utils/logger.js';

/**
 * Doctor command - Verify project setup and dependencies
 */
const doctorCommand = new Command('doctor')
  .description('Check project health and dependencies')
  .option('-p, --path <path>', 'Project path', '.')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    logger.info('Running health check...');
    logger.debug(`Project path: ${options.path}`);
    // Implementation
  });

export default doctorCommand;
