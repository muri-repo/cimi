/**
 * Template - Template definition and management
 */

class Template {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this.files = [];
    this.metadata = {
      version: config.version || '1.0.0',
      description: config.description || '',
      author: config.author || '',
    };
  }

  addFile(path, content, options = {}) {
    this.files.push({ path, content, options });
    return this;
  }

  getFiles() {
    return this.files;
  }

  toJSON() {
    return {
      name: this.name,
      metadata: this.metadata,
      files: this.files,
    };
  }
}

export default Template;
