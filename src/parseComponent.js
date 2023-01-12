const deepMerge = (target, source) => {
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
};

const matchAllToArray = (matchAll) => {
  const res = [...matchAll].map((match) => [...match]);
  return res.length ? res : null;
};

function findImport(content, importName) {
  const regexImport = new RegExp('^import.*(' + importName + ').*$', 'm');
  return regexImport.test(content);
}

function findProps(content) {
  const regexProps = /props: {((\s*\w*: {[^}]*},?\s*)*)}/;
  const propsMatch = content.match(regexProps);

  if (!propsMatch) {
    return;
  }

  const results = [];
  const props = propsMatch[1].match(/[a-zA-Z0-9_-]+(: {[^}]*})/g);

  props.forEach((prop) => {
    const propName = prop.match(/^[a-zA-Z0-9_-]+/);
    const defaultMatch = prop.match(/(?<=default: )[\w-'"]+(?=,)/);
    const isRequired = /required: true/.test(prop);
    if (!propName) {
      return;
    }
    results.push({
      name: propName[0],
      required: isRequired,
      value: defaultMatch?.[0] || null,
    });
  });

  return results;
}

function findEmits(content) {
  const regexEmits = /\$emit\(\W*([a-zA-Z0-9_-]*)/g;
  const emitMatch = matchAllToArray(content.matchAll(regexEmits));

  if (!emitMatch) {
    return;
  }

  return emitMatch.map((match) => match[1]);
}

function findInject(content) {
  const injectMatch = content.match(/(?<=inject:\s*)\[[^\]]*\]/);

  if (!injectMatch || !injectMatch[0]) {
    return;
  }

  const results = {};

  injectMatch[0]
    .split(',')
    .map((s) => s.replace(/\W*/gm, ''))
    .forEach((service) => {
      const methodRegex = new RegExp(
        '(?<=' + service + '.)[a-zA-Z0-9_-]+',
        'gm',
      );
      const methods = matchAllToArray(content.matchAll(methodRegex)).map(
        (met) => met[0],
      );
      results[service] = [...new Set(methods)];
    });

  return results;
}

function findHttpMethods(content) {
  const regexHttp = /\$http\(.*\)[^;}]*[;}]/g;
  const httpMatches = matchAllToArray(content.matchAll(regexHttp));

  if (!httpMatches) {
    return;
  }

  const results = [];
  for (const httpMatch of httpMatches) {
    let methods = httpMatch[0].match(/\.\w+\(/g);

    methods.forEach((method) => {
      const name = method.replace(/\W*/gm, '');
      results.push(name);
    });
  }
  return results;
}

/**
 * matches for '$some' or '$some.met(' or '$some.field'
 *
 * @returns {
 *   $some: {
 *     name: '$some',
 *     fields: ['field'],
 *     methods: ['met'],
 *   },
 *   ...
 * }
 */
function findServices(content) {
  const serviceMatches = matchAllToArray(
    content.matchAll(/(\$\w+)(?:(\()|\.(\w+)(\(?))/g),
  );

  if (!serviceMatches) {
    return;
  }

  const results = {};

  const ignoreCustom = `$t $n $c`;
  const ignoreBuiltIn = `$store $data $props $el $options $parent 
  $root $children $slots $scopedSlots $refs $isServer
  $attrs $listeners $watch $set $delete $on $once
  $off $emit $mount $forceUpdate $nextTick $destroy`;

  const ignoreServices = (ignoreCustom + ' ' + ignoreBuiltIn).split(/\s+/);

  serviceMatches.forEach((match) => {
    if (ignoreServices.includes(match[1])) {
      return;
    }

    const isFunction = match[2] === '(';
    const hasMethods = match[3] && match[4] === '(';
    const hasFields = match[3] && !match[4];

    const resService = results[match[1]] || {};
    const service = {
      ...resService,
      name: match[1],
    };

    if (isFunction) {
      service.isFunction = true;
    }

    if (hasMethods) {
      service.hasMethods = true;
      service.methods = [...(resService?.methods || []), match[3]];
    }

    if (hasFields) {
      service.hasFields = true;
      service.fields = [...(resService?.fields || []), match[3]];
    }

    results[match[1]] = service;
  });

  return Object.keys(results).length ? results : undefined;
}

function findTemplateEvents(content) {
  // TODO: should also return related tag name
  const regexTemplateEvents = /\@([a-zA-Z0-9_-]+)\=['"]([^'"]+)['"]/g;
  const templateEventsMatch = matchAllToArray(
    content.matchAll(regexTemplateEvents),
  );

  if (!templateEventsMatch) {
    return;
  }

  const res = {};
  templateEventsMatch.forEach((match) => (res[match[1]] = match[2]));
  return res;
}

/**
 * matches for 'name' and 'name2' in
 * mapperName('substore', ['name', 'name2'])
 * or
 * mapperName('substore', { a: 'name', b: 'name2' })
 *
 * @returns {
 *   substore: ['name', 'name2']
 * }
 */
function findStoreMapper(content, mapperName) {
  const regexMapActions = new RegExp(
    mapperName + '\\([^\'"]*[\'"]([^"\']+)["\']([^)]*)\\)',
    'gm',
  );
  const mapActionsMatch = matchAllToArray(content.matchAll(regexMapActions));

  if (!mapActionsMatch) {
    return;
  }

  const results = {};

  for (const mapAction of mapActionsMatch) {
    const storeName = mapAction[1].replace(/\W*/gm, '');
    const actionsMatch = mapAction[2].match(/['"]([^"']+)["']/gm);
    for (let action of actionsMatch) {
      action = action.replace(/\W*/gm, '');
      if (action) {
        results[storeName] = results[storeName] || [];
        results[storeName].push(action);
      }
    }
  }

  if (!Object.keys(results).length) {
    return;
  }

  return results;
}

function findStoreManualCalls(content) {
  const regexStoreUse = /store\.(state|getters|dispatch|commit)(.*)/g;
  const storeUseMatch = matchAllToArray(content.matchAll(regexStoreUse));

  if (!storeUseMatch) {
    return;
  }

  const updateSubstore = (store, substore, type, value) => {
    if (store[substore]) {
      if (store[substore][type]) {
        store[substore][type].push(value);
      } else {
        store[substore][type] = [value];
      }
    } else {
      store[substore] = { [type]: [value] };
    }
  };

  const matchSubAction = (arg) => {
    const [_, substore1, value1, substore2, value2] = arg.match(
      /(?:\.(\w+)(\[['"]\w+['"]\]|\.\w+)|\[['"](\w+)\/(\w+)['"])/,
    );
    return [substore1 || substore2, value1 || value2];
  };

  const res = {};
  storeUseMatch.forEach((match) => {
    if (match[1] === 'dispatch') {
      const [_, substore, action] = match[2].match(/\(['"](\w+)\/(\w+)['"]/);
      updateSubstore(res, substore, 'actions', action);
    }
    if (match[1] === 'state') {
      const [substore, state] = matchSubAction(match[2]);
      updateSubstore(res, substore, 'state', state.replace(/\W/g, ''));
    }
    if (match[1] === 'getters') {
      const [substore, getter] = matchSubAction(match[2]);
      updateSubstore(res, substore, 'state', getter);
    }
  });

  return res;
}

export function parseComponent(content) {
  const parsedData = {};
  const mocks = [];
  const stubs = [];

  // find props
  parsedData['props'] = findProps(content);

  // find emits
  parsedData['emits'] = findEmits(content);

  // find $http chain methods
  parsedData['http'] = findHttpMethods(content);

  // find injected services and its methods
  parsedData['inject'] = findInject(content);

  // find template events
  parsedData['templateEvents'] = findTemplateEvents(content);

  // find vue $services
  const services = findServices(content);
  if (services) {
    // take services methods to stubs array
    Object.values(services).forEach((service) => {
      if (service.hasMethods || service.hasFields) {
        mocks.push(service);
      }
      if (service.hasMethods) {
        stubs.push(...service.methods);
      }
    });
    parsedData['services'] = services;
  }

  // find window.open
  const isWindowOpen = /window\.open/g.test(content);
  if (isWindowOpen) {
    parsedData['isWindowOpen'] = true;
    stubs.push('windowOpen'); // add stub for window.open
  }

  // find if vuex is used
  const isStore = findImport(content, 'vuex') || /store\./g.test(content);

  if (isStore) {
    let store = {};

    // find actions in modules from mapActions
    const storeActions = findStoreMapper(content, 'mapActions');
    if (storeActions) {
      Object.entries(storeActions).forEach(([moduleName, actions]) => {
        store[moduleName] = {
          ...store[moduleName],
          actions,
        };
      });
    }

    // find state in modules from mapState
    const storeState = findStoreMapper(content, 'mapState');
    if (storeState) {
      Object.entries(storeState).forEach(([moduleName, stateField]) => {
        store[moduleName] = {
          ...store[moduleName],
          state: stateField,
        };
      });
    }

    // find getters in modules from mapGetters
    const storeGetters = findStoreMapper(content, 'mapGetters');
    if (storeGetters) {
      Object.entries(storeGetters).forEach(([moduleName, stateGetters]) => {
        store[moduleName] = {
          ...store[moduleName],
          getters: stateGetters,
        };
      });
    }

    // find manual actions dispatch
    const manualStore = findStoreManualCalls(content);
    store = deepMerge(store, manualStore || {});

    // delist all actions states and getters
    const allActions = [];
    const allState = [];
    const allGetters = [];

    for (const substore in store) {
      if (store[substore].actions) {
        allActions.push(...store[substore].actions);
      }
      if (store[substore].state) {
        allState.push(...store[substore].state);
      }
      if (store[substore].getters) {
        allGetters.push(...store[substore].getters);
      }
    }

    parsedData['store'] = store;
    parsedData['actions'] = allActions.length ? allActions : null;
    parsedData['state'] = allState.length ? allState : null;
    parsedData['getters'] = allGetters.length ? allGetters : null;
  }

  if (stubs.length) {
    parsedData['stubs'] = stubs;
  }

  if (mocks.length) {
    parsedData['mocks'] = mocks;
  }

  return parsedData;
}
