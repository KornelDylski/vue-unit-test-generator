---
to: <%= dir %>/<%= testDir %>/<%= specName %>.spec.js
---
<% data = JSON.parse(locals.data) -%>
<% addTests = addTests !== 'false' -%>
<% if (data.importFile) { -%>
import store from '../<%= data.importFile %>';

const { actions, state: initState } = store;
<% } else { -%>
import actions from '../actions';
import initState from '../state';
<% } -%>

const context = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: initState(),  
};

<% if (data.services && data.services.$http) { -%>
const getHttpMock = () =>
  jest.fn(()  => {
    return {
<% data.services.$http.methods.forEach((met) => { -%>
      <%= met %>: jest.fn().mockReturnThis(),
<% }) -%>
    };
  });

<% } -%>
<% if (data.services.$http || data.services.$router) { -%>
const mocks = {
<% if (data.services.$http) { -%>
  $http: getHttpMock(),
<% } -%>
<% if (data.services.$router) { -%>
  $router: {
<% data.services.$router.methods.forEach((met) => { -%>
    <%= met %>: jest.fn(),
<% }) -%>
  },
<% } -%>
}
<% } -%>
/**
 * <%= storeName %> actions
 */
describe('<%= h.changeCase.pascal(storeName) %> actions', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    context.state = initState();
  });
<% if (addTests) { -%>
<% data.actions.forEach(({ name, commits, dispatches, getters, rootGetters, parameters }) => { %>
  test('<%= name %>', () => {
<% if (parameters) { -%>
<% if (parameters.forEach) { -%>
    const params = {
<% parameters.forEach((param) => { -%>
      <%= param %>: null, /* TODO: fill param */
<% }) -%>
    };
<% } else { -%>
    const params = {};
<% } -%>
<% } -%>
<% if (getters || rootGetters) { -%>
    actions.<%= name %>({
      ...context,
<% if (getters) { -%>
      getters: {
<% getters.forEach((getter) => { -%>
<% if (getter.indexOf('/') >= 0) { -%>
        '<%= getter %>': null, /* TODO: fill getter */
<% } else { -%>
        <%= getter %>: null, /* TODO: fill getter */
<% } -%>
<% }) -%>
      },
<% } -%>
<% if (rootGetters) { -%>
      rootGetters: {
<% rootGetters.forEach((getter) => { -%>
<% if (getter.indexOf('/') >= 0) { -%>
        '<%= getter %>': null, /* TODO: fill getter */
<% } else { -%>
        <%= getter %>: null, /* TODO: fill getter */
<% } -%>
<% }) -%>
      },
<% } -%>
    }, params);
<% } else { -%>
<% if (parameters) { -%>
    actions.<%= name %>(context, params);
<% } else { -%>
    actions.<%= name %>(context);
<% } -%>
<% } -%>
<% if (commits || dispatches) { %>
<% if (commits) { -%>
<% commits.forEach(({ name, args }, nth) => { -%>
<% if (args.length) { -%>
    expect(context.commit).toHaveBeenCalledWith('<%= name %>', null); /* TODO: fill commit args */
<% } else {-%>
    expect(context.commit).toHaveBeenCalledWith('<%= name %>');
<% } -%>
<% }) -%>
<% } -%>
<% if (dispatches) { -%>
<% dispatches.forEach(({ name, args }, nth) => { -%>
<% if (args.length) { -%>
    expect(context.dispatch).toHaveBeenCalledWith('<%= name %>', null); /* TODO: fill dispatch args */
<% } else {-%>
    expect(context.dispatch).toHaveBeenCalledWith('<%= name %>');
<% } -%>
<% }) -%>
<% } -%>
<% } -%>
  });
<% }) -%>
<% } -%>
});