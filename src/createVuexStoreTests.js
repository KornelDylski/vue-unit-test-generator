import { promises as fs } from 'fs';
import path from 'path';
import { parseActions, parseGetters, parseMutations } from './parseStore.js';
import { runHygen } from './utils.js';

async function createStoreModuleTests(
  content, // file module
  fileType, // actions
  storeName, // user
  storePath, // /something/store/user/
  importFile,
  // prettier-ignore
  { verbose, v, dry, template, name, n, addTests, a, testDir, d, rootDir, clip },
) {
  testDir = testDir || d || '__tests__';
  addTests = addTests || a || 'false';
  name = name || n || fileType;

  const hygenArgs = ['unit', 'store:' + fileType];
  hygenArgs.push('--name', fileType);
  hygenArgs.push('--storeName', storeName);
  hygenArgs.push('--dir', storePath);
  hygenArgs.push('--specName', name);
  hygenArgs.push('--testDir', testDir);
  hygenArgs.push('--addTests', addTests);

  let data;
  if (fileType === 'actions') {
    data = parseActions(content);
  }
  if (fileType === 'getters') {
    data = parseGetters(content);
  }
  if (fileType === 'mutations') {
    data = parseMutations(content);
  }

  if (verbose || v || dry) {
    console.log(JSON.stringify(data, null, 2));

    if (dry) {
      return;
    }
  }

  const hygenArgsData = { ...data, importFile };

  hygenArgs.push('--data', JSON.stringify(hygenArgsData));

  const templatePath = template
    ? path.resolve(template)
    : path.resolve(`${rootDir}/_templates`);

  await runHygen(hygenArgs, templatePath, rootDir);

  if (clip) {
    const specPath = `${storePath}/${testDir}/${name}.spec.js`;
    const specContent = await fs.readFile(path.resolve(specPath), 'utf8');

    if (clip) {
      clipboardy.writeSync(specContent);
      console.log('Copied to clipboard');
    }
  }
}

function stripImports(jsString) {
  return jsString
    .replace(/(\w+) = (await |)import\([^\)]*\)/gm, '$1 = {}')
    .replace(/import\([^\)]*\);?/gm, '')
    .replace(/import (\n|.)*?(\'$|;$)/gm, '');
}

async function loadFileIgnoringImports(filePath) {
  let jsString = await fs.readFile(filePath, 'utf8');

  const dataUri =
    'data:text/javascript;charset=utf-8,' +
    encodeURIComponent(stripImports(jsString));

  return await import(dataUri);
}

// prettier-ignore
export default async function createVuexStoreTests(
  fileName,
  storeName,
  storePath,
  args,
) {
  const filePath = path.resolve(storePath, fileName + '.js');
  let content = await loadFileIgnoringImports(filePath);
  content = content.default ?? { ...content };
  
  if (['actions', 'getters', 'mutations'].includes(fileName)) {
    await createStoreModuleTests(content, fileName, storeName, storePath, false, args);
  } else {
    if (content.actions) {
      await createStoreModuleTests(content.actions, 'actions', storeName, storePath, fileName, args);
    }
    if (content.getters) {
      await createStoreModuleTests(content.getters, 'getters', storeName, storePath, fileName, args);
    }
    if (content.mutations) {
      await createStoreModuleTests(content.mutations, 'mutations', storeName, storePath, fileName, args);
    }
  }
}
