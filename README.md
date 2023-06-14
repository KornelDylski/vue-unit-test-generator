# vue-unit-test-generator (vutg)

Unit tests schema generator for Vue components

## Dependencies

Generated tests are compatible with:

- [Vuejs v2](https://v2.vuejs.org/)
- [Vuex](https://v3.vuex.vuejs.org/)
- [Jest framework](https://jestjs.io/)
- [Vue Test-Utils v1](https://v1.test-utils.vuejs.org/)

Generator is using for template engine.
- [Hygen IO](https://www.hygen.io/docs/quick-start/)

## Local installation

1. clone repository
```
git clone git@github.com:KornelDylski/vue-unit-test-generator.git
```

2. install package globally
```
cd vue-unit-test-generator
npm install -g .
```

## Run with Vue component

```
vutg ./path/to/component.vue
```

The function will generate a spec test file for the `component.vue` at the path
```
./path/to/__tests__/component.spec.js
```

The test file will contain a boilerplate for tests with prepared mocks.

## Run with Vuex store files

```
# run on dir containing `state.js` `actions.js` `mutations.js` and `getters.js`
vutg ./path/to/store/storeName/

# run on single file
vutg ./path/to/store/storeName.js
```

The function will generate a spec test files for **actions**, **mutations** and **getters**

```
./path/to/store/storeName/__tests__/actions.spec.js
./path/to/store/storeName/__tests__/mutations.spec.js
./path/to/store/storeName/__tests__/getters.spec.js
```

## Options
```
  -h --help          # show this message and quit
  -n --name          # set custom name for spec file
  -d --testDir       # relative directory where spec file will be placed, default "__tests__"
  -a --addTests      # will add initial tests schemas in "describe()" section
  -v --verbose       # print extracted data used for mocking
  --template         # set path to custom hygen.io template 
  --dry              # dry run
```

## Features
The generator parses component files with multiple regexp to extract data that is used to create mocks in the spec file. **It is NOT able to understand JS/Vue code!**

- mocks props
- mocks `$emit` calls
- mocks `$http` chain call (e.g. `$http('...').get().json()`)
- mocks providers
- mocks `window.open`
- mocks and stubs custom non-built-in services which starts from `$`
- mocks store and stubs all actions with `jest.fn()`
  - actions by `mapActions` or `$store.dispatch('...')`
  - states by `mapState` or `$store.state.`
  - getters by `mapGetters` or `$store.getters.`

## Common usecase

1. Generate spec file `vutg ./YourComponent.vue`

2. Fill mocked fields with test data (replace `/* TODO */` comments)

3. In `beforeEach` or `test` initialize wrapper with `mountComponent` with test-specific data

```
  test('should match snapshot', () => {
    wrapper = mountComponent({
      myPropName: 'custom value',
      myStoreField: 'custom store value',
    });

    ...
    expect(wrapper.element).toMatchSnapshot();
  });
```

4. Fill `test` for each `action` (replace `/* TODO */` comments)
```
  test('should call "someAction" action when something', () => {
    ...

    expect(stubs.someAction).toHaveBeenCalledTimes(1);
  });
```

5.  Fill `test` for each `emit` (replace `/* TODO */` comments)
```
  test('should emit "close" event when something', () => {
    ...

    expect(wrapper.emitted('close')).toBeTruthy();
  });
```

6. Add tests for `child components events`
```
  test('should do something on child-component "@some"', () => {
    wrapper.findComponent({ ref: 'childComponent' }).vm.$emit('some');

    ...
  })
```

7. Add tests for other `template behaviours`
```
  test('should do something when someProperty is false', () => {
    wrapper = mountComponent({ someProperty: false });

    ...
  })
```

## Contributing
If you find a bug or have an idea for a new feature, please open an issue or submit a pull request. We welcome all contributions!

## License
vue-unit-test-generator is licensed under the MIT License. See LICENSE for more information.