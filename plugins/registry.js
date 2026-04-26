// cimi/plugins/registry.js

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const PLUGIN_DIR = dirname;

let pluginCache = null;

/**
 * Load plugin module
 */
async function loadPluginModule(pluginPath) {
  const url = pathToFileURL(pluginPath).href;
  const mod = await import(url);

  if (!mod.default) {
    throw new Error(`Plugin must export default: ${pluginPath}`);
  }

  return mod.default;
}

/**
 * Discover plugins (NOW loads real modules like base)
 */
async function discoverPlugins() {
  if (pluginCache) return pluginCache;

  const plugins = [];

  const entries = fs.readdirSync(PLUGIN_DIR, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const pluginName = entry.name;

    const indexPath = path.join(
      PLUGIN_DIR,
      pluginName,
      "index.js"
    );

    if (!fs.existsSync(indexPath)) continue;

    try {
      const plugin = await loadPluginModule(indexPath);

      plugins.push({
        name: plugin.name || pluginName,
        description: plugin.description || "",
        version: plugin.version || "1.0.0",
        create: plugin.create, // 👈 IMPORTANT
        raw: plugin,
      });
    } catch (err) {
      console.warn(`⚠️ Failed loading plugin ${pluginName}`, err.message);
    }
  }

  pluginCache = plugins;
  return plugins;
}

export async function loadPlugin(name) {
  const pluginPath = path.join(PLUGIN_DIR, name, "index.js");

  if (!fs.existsSync(pluginPath)) {
    throw new Error(`Plugin "${name}" not found`);
  }

  const mod = await import(pathToFileURL(pluginPath).href);

  if (!mod.default) {
    throw new Error(`Plugin "${name}" must export default`);
  }

  return mod.default;
}

export async function getAvailablePlugins() {
  const plugins = await discoverPlugins();
  console.log("Available plugins:", plugins.map(p => p.name).join(", ")); // Debug log

  return plugins.map((p) => ({
    name: p.name,
    description: p.description,
    version: p.version,
  }));
}