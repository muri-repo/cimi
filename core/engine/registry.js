/**
 * Registry - Template registry for managing available templates
 */

class Registry {
  constructor() {
    this.templates = new Map();
  }

  register(name, template) {
    this.templates.set(name, template);
    return this;
  }

  get(name) {
    return this.templates.get(name);
  }

  has(name) {
    return this.templates.has(name);
  }

  list() {
    return Array.from(this.templates.keys());
  }

  remove(name) {
    return this.templates.delete(name);
  }
}

export default Registry;
