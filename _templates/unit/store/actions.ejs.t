---
to: <%= dir %>/<%= testDir %>/<%= specName %>.spec.js
---
<% data = JSON.parse(locals.data) -%>
<% if (data.importFile) { -%>
import { actions, state as initState } from '../<%= data.importFile %>';
<% } else { -%>
import actions from '../actions';
import initState from '../state';
<% } -%>

const mocks = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  state: initState(),  
};

/**
 * <%= storeName %> actions
 */
describe('<%= h.changeCase.pascal(storeName) %> actions', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    mocks.state = initState();
  });
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
      ...mocks,
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
    actions.<%= name %>(mocks, params);
<% } else { -%>
    actions.<%= name %>(mocks);
<% } -%>
<% } -%>
<% if (commits || dispatches) { %>
<% if (commits) { -%>
<% commits.forEach(({ name, args }, nth) => { -%>
<% if (args.length) { -%>
    expect(mocks.commit).toHaveBeenCalledWith('<%= name %>', null); /* TODO: fill commit args */
<% } else {-%>
    expect(mocks.commit).toHaveBeenCalledWith('<%= name %>');
<% } -%>
<% }) -%>
<% } -%>
<% if (dispatches) { -%>
<% dispatches.forEach(({ name, args }, nth) => { -%>
<% if (args.length) { -%>
    expect(mocks.dispatch).toHaveBeenCalledWith('<%= name %>', null); /* TODO: fill dispatch args */
<% } else {-%>
    expect(mocks.dispatch).toHaveBeenCalledWith('<%= name %>');
<% } -%>
<% }) -%>
<% } -%>
<% } -%>
  });
<% }) -%>
});