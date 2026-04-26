import { Command } from 'commander';
import logger from '../utils/logger.js';

/**
 * Add command - Add modules or features to existing project
 */
const addCommand = new Command('add')
  .description('Add modules or features to your project')
  .argument('<module>', 'Module to add (auth, user, docker, etc.)')
  .option('-p, --path <path>', 'Project path', '.')
  .action(async (module, options) => {
    logger.info(`Adding module: ${module}`);
    logger.debug(`Project path: ${options.path}`);
    // Implementation
  });

export default addCommand;
