import { joinPathFragments, Tree, updateJson } from '@nrwl/devkit';

export const eslintConfigFileWhitelist = [
  '.eslintrc',
  // '.eslintrc.js',
  // '.eslintrc.cjs',
  // '.eslintrc.yaml',
  // '.eslintrc.yml',
  '.eslintrc.json',
  // 'eslint.config.js', // new format that requires `ESLINT_USE_FLAT_CONFIG=true`
  '.eslintrc.base.json',
];

// export const baseEsLintConfigFile = '.eslintrc.base.json';

/**
 * @deprecated currently not needed since eslint path is set in generator options
 * This idea can be useful though in the future when we want to detect their eslint
 */
export function addPluginToEslint(tree: Tree, plugin: string, directoryPath = ''): boolean {
  for (const file of eslintConfigFileWhitelist) {
    const path = joinPathFragments(directoryPath, file);

    if (tree.exists(path)) {
      addPluginToJson(tree, plugin, path);
      return true;
    }
  }

  return false;
}

export function addPluginToJson(tree: Tree, plugin: string, jsonPath: string): void {
  updateJson(tree, jsonPath, (json) => {
    const plugins = json.plugins ?? [];

    if (plugins.includes(plugin)) {
      return json;
    }

    return {
      ...json,
      plugins: [...plugins, plugin],
    };
  });
}