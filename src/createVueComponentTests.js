import { promises as fs } from 'fs';
import path from 'path';
import { parseComponent } from './parseComponent.js';
import { runHygen } from './utils.js';

export default async function createVueComponentTests(
  filePath,
  componentName,
  componentPath,
  { dry, template, verbose, v, name, n, testDir, d, omitTests, o, rootDir },
) {
  const content = await fs.readFile(filePath, 'utf8');

  const hygenArgs = ['unit', 'component'];

  // spec name
  hygenArgs.push('--name', componentName);
  hygenArgs.push('--dir', componentPath);
  hygenArgs.push('--specName', name || n || componentName);
  hygenArgs.push('--testDir', testDir || d || '__tests__');
  hygenArgs.push('--omitTests', omitTests || o || 'false');

  const hygenArgsData = parseComponent(content);

  if (verbose || v || dry) {
    console.log(hygenArgsData);

    if (dry) {
      exit();
    }
  }

  hygenArgs.push('--data', JSON.stringify(hygenArgsData));

  const templatePath = template
    ? path.resolve(template)
    : path.resolve(`${rootDir}/_templates`);

  await runHygen(hygenArgs, templatePath, rootDir);
}