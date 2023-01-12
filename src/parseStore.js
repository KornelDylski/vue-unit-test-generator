import { matchAllToArray } from './utils.js';

export function parseParams(funcStr) {
  let args = funcStr.trim().split(/\,(?![^{]*[}])/g);

  args = args.map((arg) => {
    if (/[{}]/.test(arg)) {
      return arg
        .split(/\,/g)
        .map((a) => a.replace(/\W/g, ''))
        .filter(Boolean);
    } else {
      return arg.replace(/\W/g, '');
    }
  });

  return args;
}

export function parseArgs(funcStr) {
  return funcStr.trim().split(/\,(?![^{]*[}])/g);
}

export function stripComments(content) {
  return content.replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, '');
}

/**
 * find function definition part extract its parameters
 */
function findDefinitionParams(funcContent) {
  const funcArgs = funcContent.match(/\(([^\)]*)\)/);

  if (!funcArgs || !funcArgs[1]) {
    return;
  }

  return parseParams(funcArgs[1]);
}

/**
 * find all function calls in code and extract passed arguments
 */
function findCallsArgs(codeContent, functionName) {
  // prettier-ignore
  const regexp = new RegExp("(?:^|[^\\w])" + functionName + "\\(((?:[^()]*\\([^)]*\\)[^()]*)+|[^)]*)\\)", 'g');
  const matches = matchAllToArray(codeContent.matchAll(regexp));

  if (!matches) {
    return;
  }

  return matches
    .map((match) => parseArgs(match[1]))
    .map(([name, ...restArgs]) => ({
      name: name.replace(/\W/g, ''),
      args: restArgs,
    }));
}

function findObjectField(codeContent, obj) {
  const reg = new RegExp(obj + "(?:\\.(\\w+)|\\['([^']+)'\\])", 'g');
  const matches = matchAllToArray(codeContent.matchAll(reg));

  if (!matches) {
    return;
  }

  return matches.map((match) => match.filter(m => m)[1]);
}

function parseAction([name, func]) {
  const funcContent = stripComments(func.toString());

  const [contextParams, actionParams] = findDefinitionParams(funcContent);
  const getters = findObjectField(funcContent, 'getters');
  const rootGetters = findObjectField(funcContent, 'rootGetters');
  const commits = findCallsArgs(funcContent, 'commit');
  const dispatches = findCallsArgs(funcContent, 'dispatch');

  return {
    name,
    commits,
    dispatches,
    parameters: actionParams,
    getters,
    rootGetters,
  };
}

export function parseActions(actionsMap) {
  return {
    actions: Object.entries(actionsMap).map(parseAction),
  };
}

export function parseGetters(gettersMap) {
  return {
    getters: Object.keys(gettersMap),
  };
}

export function parseMutations(mutationsMap) {
  return {
    mutations: Object.keys(mutationsMap),
  };
}
