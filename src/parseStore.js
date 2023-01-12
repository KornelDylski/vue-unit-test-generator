function parseFuncArgs(funcStr) {
  const argsStr = funcStr.match(/\(([^\)]*)\)/m);

  if (!argsStr) {
    return;
  }

  let args = argsStr[1].split(/\,(?![^{]*[}])/g);

  args = args.map((arg) => {
    if (/\,/.test(arg)) {
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

function parseAction([name, func]) {
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  const funcStr = func.toString().replace(STRIP_COMMENTS, '');

  let parameters = parseFuncArgs(funcStr);
  parameters = parameters?.length ? parameters[1] : null;

  const getters = funcStr.match(/(?<=getters(?:\.|\[\'))\w+/g);
  const rootGetters = funcStr.match(/(?<=rootGetters(?:\.|\[\'))\w+/g);
  const commits = funcStr.match(/(?<=commit\(['"])\w+/g);
  const dispatches = funcStr.match(/(?<=dispatch\(['"])\w+/g);

  return {
    name,
    commits,
    dispatches,
    parameters,
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
