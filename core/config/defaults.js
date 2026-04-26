/**
 * Default configuration
 */

export default {
  projectDefaults: {
    version: '1.0.0',
    license: 'MIT',
    description: '',
  },

  templates: {
    base: {
      description: 'Basic Node.js project template',
      files: ['package.json', '.gitignore', 'README.md'],
    },
    express: {
      description: 'Express.js server template',
      files: ['package.json', 'server.js', 'routes/', 'controllers/'],
    },
    fastify: {
      description: 'Fastify server template',
      files: ['package.json', 'server.js', 'routes/', 'controllers/'],
    },
  },

  modules: {
    auth: {
      description: 'Authentication module',
      dependencies: ['jsonwebtoken', 'bcryptjs'],
    },
    user: {
      description: 'User management module',
      dependencies: [],
    },
    docker: {
      description: 'Docker configuration',
      files: ['Dockerfile', 'docker-compose.yml', '.dockerignore'],
    },
  },
};
