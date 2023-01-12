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

export function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], deepMerge(target[key], source[key]));
      } else {
        target[key] = source[key];
      }
    }
  }

  Object.assign(target || {}, source);
  return target;
}

export function matchAllToArray(matchAll) {
  if (!matchAll) {
    return null;
  }
  const res = [...matchAll].map((match) => [...match]);
  return res.length ? res : null;
}
