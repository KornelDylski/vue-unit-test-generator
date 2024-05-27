---
to: <%= dir %>/<%= testDir %>/<%= specName %>.spec.js
---
<% data = JSON.parse(locals.data) -%>
<% addTests = addTests !== 'false' -%>
<% if (data.importFile) { -%>
import store from '../<%= data.importFile %>';

const { mutations, state: initState } = store;
<% } else { -%>
import initState from '../state';
<% } -%>

const context = {
  state: initState(),  
};

/**
 * <%= storeName %> mutations
 */
describe('<%= h.changeCase.pascal(storeName) %> mutations', () => {
  
  beforeEach(() => {
    context.state = initState();
  });
<% if (addTests) { -%>
<% data.mutations.forEach((mutation) => { %>
  test('<%= mutation %>', () => {
    const params = {};
    mutations.<%= mutation %>(context.state, params);

    /* TODO: fill expected changes in state */
    expect(context.state).toEqual(null);
  });
<% }) -%>
<% } -%>
});