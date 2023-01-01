---
to: <%= dir %>/<%= testDir %>/<%= specName %>.spec.js
---
<% data = JSON.parse(locals.data) -%>
<% omitTests = omitTests !== 'false' -%>
<% if (data.store) { -%>
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
<% } else { -%>
import { shallowMount } from '@vue/test-utils';
<% } -%>
import <%= Name %> from '../<%= Name %>.vue';
<% if (data.store) { %>
const localVue = createLocalVue();
localVue.use(Vuex);
<% } -%>
<% if (data.stubs) { %>
const stubs = {
<% data.stubs.forEach(stub => { -%>
  <%= stub %>: jest.fn(),
<% }) -%>
};
<% } -%>
<% if (data.isWindowOpen) { %>
window.open = stubs.windowOpen;
<% } -%>
<% if (data.http) { %>
const getHttpMock = () =>
  jest.fn(()  => {
    return {
<% data.http.forEach(method => { -%>
      <%= method %>: jest.fn().mockReturnThis(),
<% }) -%>
    };
  });
<% } -%>
<% if (data.store) { %>
<% if (data.field || data.getters) { -%>
const getStore = (args) =>
<% } else { -%>
const getStore = (args) => // eslint-disable-line no-unused-vars
<% } -%>
  new Vuex.Store({
    modules: {
<% Object.keys(data.store).forEach(module => { -%>
      <%= module %>: {
        namespaced: true,
<% if (data.store[module].actions) { -%>
        actions: {
<% data.store[module].actions.forEach(action => { -%>
          <%= action %>: stubs.<%= action %>,
<% }) -%>
        },
<% } -%>
<% if (data.store[module].state) { -%>
        state: {
<% data.store[module].state.forEach(field => { -%>
          <%= field %>: args.<%= field %>, /* TODO: set field */
<% }) -%>
        },
<% } -%>
<% if (data.store[module].getters) { -%>
        getters: {
<% data.store[module].getters.forEach(getter => { -%>
          <%= getter %>: () => args.<%= getter %>, /* TODO: set getter response */
<% }) -%>
        },
<% } -%>
      },
<% }) -%>
    },
  });
<% } -%>
<% if (data.props || data.inject || data.store || data.mocks) { %>
const mountComponent = (args = {}) =>
  shallowMount(<%= Name %>, {
<% if (data.props) { -%>
    propsData: {
<% data.props.forEach(({ name, required, value }) => { -%>
<% if (required) { -%>
      <%= name %>: args.<%= name -%>, /* TODO: set required property */
<% } else if (value !== null) { -%>
      <%= name %>: args.<%= name -%> ?? <%= value -%>,
<% } else { -%>
      <%= name %>: args.<%= name -%>,
<% } -%>
<% }) -%>
    },
<% } -%>
<% if (data.inject) { -%>
    provide: {
<% Object.entries(data.inject).forEach(([service, methods]) => { -%>
      <%= service %>: {
<% methods.forEach((met) => { -%>
        <%= met %>: null, /* TODO: provide property */
<% }) -%>
      },
<% }) -%>
    },
<% } -%>
<% if (data.mocks || data.http) { -%>
    mocks: {
<% if (data.http) { -%>
      $http: getHttpMock(),
<% } -%>
<% data.mocks.forEach(({ name, hasFields, fields, hasMethods, methods }) => { -%>
<% if (hasMethods || hasFields) { -%>
      <%= name %>: {
<% methods && methods.forEach((method) => { -%>
        <%= method %>: stubs.<%= method %>,
<% }) -%>
<% fields && fields.forEach((field) => { -%>
        <%= field %>: null, /* TODO: mock value */
<% }) -%>
      },
<% } -%>
<% }) -%>
    },
<% } -%>
<% if (data.store) { -%>
    localVue,
    store: getStore(args),
<% } -%>
  });
<% } -%>

/**
 * <%= Name %>.vue unit tests
 */
describe('<%= Name %>', () => {
  let wrapper;

  beforeEach(() => {
<% if (data.props || data.inject || data.store || data.mocks) { -%>
    wrapper = mountComponent();
<% } else { -%>
    wrapper = shallowMount(<%= Name %>);
<% } -%>
  });
<% if (data.stubs) { %>
  afterEach(() => {
    jest.clearAllMocks();
  });
<% } -%>

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
<% if (data.store && !omitTests) { -%>
<% Object.entries(data.store).forEach(([storeName, { actions }]) => { -%>
<% if (actions) { -%>
<% actions.forEach(action => { %>
  test('should call "<%= action %>" action', () => {
    /* TODO: <%= storeName %>.<%= action %> action */
    expect(stubs.<%= action %>).toHaveBeenCalledTimes(1);
  });
<% }) -%>
<% } -%>
<% }) -%>
<% } -%>
<% if (data.emits && !omitTests) { -%>
<% data.emits.forEach(emit => { %>
  test('should emit "<%= emit %>" event', () => {
    /* TODO: <%= emit %> event */
    expect(wrapper.emitted('<%= emit %>')).toBeTruthy();
  });
<% }) -%>
<% } -%>
});
