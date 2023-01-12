import path from 'path';
import { parseActions, parseGetters, parseMutations } from './parseStore.js';
import { runHygen } from './utils.js';

async function createStoreModuleTests(
  content, // file module
  fileType, // actions
  storeName, // user
  storePath, // /something/store/user/
  importFile,
  { verbose, v, dry, template, name, n, testDir, d, rootDir },
) {
  const hygenArgs = ['unit', 'store:' + fileType];

  // spec name
  hygenArgs.push('--name', fileType);
  hygenArgs.push('--storeName', storeName);
  hygenArgs.push('--dir', storePath);
  hygenArgs.push('--specName', name || n || fileType);
  hygenArgs.push('--testDir', testDir || d || '__tests__');

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
    console.log(data);

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
}

// prettier-ignore
export default async function createVuexStoreTests(
  fileName,
  storeName,
  storePath,
  args,
) {
  let content = await import('file:' + path.resolve(storePath, fileName + '.js'));
  content = content.default ?? { ...content };

  if (['actions', 'getters', 'mutations'].includes(fileName)) {
    await createStoreModuleTests(content, fileName, storeName, storePath, false, args);
  } else {
    await createStoreModuleTests(content.actions, 'actions', storeName, storePath, fileName, args);
    await createStoreModuleTests(content.getters, 'getters', storeName, storePath, fileName, args);
    await createStoreModuleTests(content.mutations, 'mutations', storeName, storePath, fileName, args);
  }
}
