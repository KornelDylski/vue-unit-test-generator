import { fork } from 'child_process';
import { createInterface } from 'readline';
import path from 'path';

export function runHygen(hygenArgs, templatePath, rootDir) {
  return new Promise((resolve, reject) => {
    const child = fork(
      path.resolve(`${rootDir}/node_modules/hygen/dist/bin`),
      hygenArgs,
      {
        stdio: process.stdio,
        env: { HYGEN_TMPLS: templatePath },
      },
    );
    child.on('exit', resolve);
    child.on('close', resolve);
    child.on('message', console.log);
    child.on('error', (error) => {
      console.error('error', error);
      reject(error);
    });
  });
}

export function question(questionStr) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    readline.question('\x1b[31m' + questionStr + ' ', (out) => {
      resolve(out);
      readline.close();
    }),
  );
}
