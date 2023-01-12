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
  test('should test "<%= name %>" action', () => {
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
        <%= getter %>: null, /* TODO: fill getter */
<% }) -%>
      },
<% } -%>
<% if (rootGetters) { -%>
      rootGetters: {
<% rootGetters.forEach((getter) => { -%>
        <%= getter %>: null, /* TODO: fill getter */
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
<% commits.forEach((mutationName, nth) => { -%>
    expect(mocks.commit).toHaveBeenNthCalledWith(<%= nth + 1 %>, '<%= mutationName %>'); /* TODO: fill commit args */
<% }) -%>
<% } -%>
<% if (dispatches) { -%>
<% dispatches.forEach((actionName, nth) => { -%>
    expect(mocks.dispatch).toHaveBeenNthCalledWith(<%= nth + 1 %>, '<%= actionName %>'); /* TODO: fill dispatch args */
<% }) -%>
<% } -%>
<% } -%>
  });
<% }) -%>
});