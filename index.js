#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { exit } from 'process';
import { fileURLToPath } from 'url';
import yargsParser from 'yargs-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import createVueComponentTests from './src/createVueComponentTests.js';
import createVuexStoreTests from './src/createVuexStoreTests.js';

async function createUnitTest(argPath, args) {
  const targetPath = path.resolve(argPath);
  const pathParsed = path.parse(targetPath);
  const parentPath = path.resolve(targetPath, '..');

  if (!pathParsed.ext) {
    const stat = await fs.lstat(targetPath);
    if (stat.isDirectory()) {
      let filesInDir = await fs.readdir(targetPath);

      /**
       * create store tests from /storename/index.js file
       */
      if (filesInDir.includes('index.js')) {
        return await createVuexStoreTests(
          'index',
          pathParsed.name,
          targetPath,
          args,
        );
      }

      /**
       * create store tests from store /storename/*.js files
       */
      const storeFiles = ['actions.js', 'getters.js', 'mutations.js'];
      for (const file of filesInDir) {
        if (!storeFiles.includes(file)) {
          continue;
        }
        const fileName = file.split('.')[0];
        await createVuexStoreTests(fileName, pathParsed.name, targetPath, args);
      }
      return;
    }
  }

  if (pathParsed.ext === '.js') {
    /**
     * create store tests from /storename/*.js file
     */
    if (
      ['actions', 'getters', 'mutations', 'index'].includes(pathParsed.name)
    ) {
      return await createVuexStoreTests(
        pathParsed.name,
        path.parse(parentPath).name,
        parentPath,
        args,
      );
    }

    /**
     * create store tests from storename.js file
     */
    return await createVuexStoreTests(
      pathParsed.name,
      pathParsed.name,
      parentPath,
      args,
    );
  }

  if (pathParsed.ext !== '.vue') {
    console.error(`
      Incorect file extension. 
      Supported [.vue] for coponents and [.js] for store
    `);
  }

  /**
   * create component tests from component.vue file
   */
  if (pathParsed.ext === '.vue') {
    return await createVueComponentTests(
      targetPath,
      pathParsed.name,
      parentPath,
      args,
    );
  }
}

/**
 * cli
 */
const scriptArgs = yargsParser(process.argv.slice(2));

if (scriptArgs['v']) {
  async function printPackageVersion() {
    const packageJson = await fs.readFile(
      path.resolve(__dirname, 'package.json'),
      'utf-8',
    );
    const { version } = JSON.parse(packageJson);
    console.log(version);
  }

  printPackageVersion();
  exit();
}

if (scriptArgs['help'] || scriptArgs['h'] || process.argv.length <= 2) {
  console.log(
    '\x1b[33m%s\x1b[0m',
    `
Unit tests generator for Vue components
  -h --help          # show this message and quit
  -n --name          # set custom name for spec file
  -d --testDir       # relative directory where spec file will be placed, default "__tests__"
  -a --addTests      # will add initial tests schemas in "describe()" section
  -v --verbose       # print data passed to template
  --template         # set path to custom hygen.io template 
  --dry              # dry run
`,
  );

  exit();
}

if (scriptArgs && scriptArgs['_'].length) {
  scriptArgs['_'].forEach((filePath) => {
    try {
      createUnitTest(path.normalize(filePath), {
        rootDir: __dirname,
        ...scriptArgs,
      });
    } catch (err) {
      console.error(err);
    }
  });
}
