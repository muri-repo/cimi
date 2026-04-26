import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Command execution utilities
 */

const execUtils = {
  async run(command, options = {}) {
    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: process.cwd(),
        ...options,
      });
      return { stdout, stderr, success: true };
    } catch (error) {
      return {
        stdout: error.stdout || '',
        stderr: error.stderr || '',
        error: error.message,
        success: false,
      };
    }
  },

  async npmInstall(cwd) {
    return this.run('npm install', { cwd });
  },

  async gitInit(cwd) {
    return this.run('git init', { cwd });
  },
};

export default execUtils;
