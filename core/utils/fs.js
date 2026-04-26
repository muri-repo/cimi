import { promises as fs } from 'fs';
import path from 'path';

/**
 * File system utilities
 */

const fsUtils = {
  async ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
  },

  async readFile(filePath) {
    return fs.readFile(filePath, 'utf-8');
  },

  async writeFile(filePath, content) {
    await this.ensureDir(path.dirname(filePath));
    return fs.writeFile(filePath, content, 'utf-8');
  },

  async copyFile(src, dest) {
    await this.ensureDir(path.dirname(dest));
    return fs.copyFile(src, dest);
  },

  async pathExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  },

  async listDir(dir) {
    return fs.readdir(dir);
  },
};

export default fsUtils;
