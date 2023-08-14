import clipboardy from 'clipboardy';
import { promises as fs } from 'fs';
import path from 'path';
import { parseComponent } from './parseComponent.js';
import { runHygen } from './utils.js';

export default async function createVueComponentTests(
  filePath,
  componentName,
  componentPath,
  // prettier-ignore
  { template, verbose, v, dry, name, n, testDir, d, addTests, a, rootDir, clip },
) {
  testDir = testDir || d || '__tests__';
  addTests = addTests || a || 'false';
  verbose = verbose || v || false;
  const specName = name || n || componentName;

  const hygenArgs = ['unit', 'component'];
  hygenArgs.push('--name', componentName);
  hygenArgs.push('--dir', componentPath);
  hygenArgs.push('--specName', specName);
  hygenArgs.push('--testDir', testDir);
  hygenArgs.push('--addTests', addTests);

  const componentContent = await fs.readFile(filePath, 'utf8');

  const hygenArgsData = parseComponent(componentContent);

  if (verbose || dry) {
    console.log(hygenArgsData);

    if (dry) {
      return;
    }
  }

  hygenArgs.push('--data', JSON.stringify(hygenArgsData));

  const templatePath = template
    ? path.resolve(template)
    : path.resolve(`${rootDir}/_templates`);

  await runHygen(hygenArgs, templatePath, rootDir);

  if (clip) {
    const specPath = `${componentPath}/${testDir}/${specName}.spec.js`;
    const specContent = await fs.readFile(path.resolve(specPath), 'utf8');

    if (clip) {
      // prettier-ignore
      clipboardy.writeSync(
        '=== COMPONENT ===\n' +
        componentContent +
        '\n\n' +
        '=== TEST SPEC ===\n' +
        specContent
      );
      console.log('Copied to clipboard');
    }
  }
}
