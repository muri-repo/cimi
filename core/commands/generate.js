import { Command } from 'commander';
import logger from '../utils/logger.js';

/**
 * Generate command - Generate specific files from templates
 */
const generateCommand = new Command('generate')
  .description('Generate specific files from templates')
  .argument('<type>', 'Type of file to generate (controller, model, service, etc.)')
  .argument('<name>', 'Name of the generated file')
  .option('-p, --path <path>', 'Output path', '.')
  .action(async (type, name, options) => {
    logger.info(`Generating ${type}: ${name}`);
    logger.debug(`Output path: ${options.path}`);
    // Implementation
  });

export default generateCommand;
