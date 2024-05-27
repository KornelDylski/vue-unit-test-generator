---
to: <%= dir %>/<%= testDir %>/<%= specName %>.spec.js
---
<% data = JSON.parse(locals.data) -%>
<% addTests = addTests !== 'false' -%>
<% if (data.importFile) { -%>
import store from '../<%= data.importFile %>';

const { getters, state: initState } = store;
<% } else { -%>
import initState from '../state';
<% } -%>

const context = {
  state: initState(),
};

/**
 * <%= storeName %> getters
 */
describe('<%= h.changeCase.pascal(storeName) %> getters', () => {
  
  beforeEach(() => {
    context.state = initState();
  });
<% if (addTests) { -%>
<% data.getters.forEach((getter) => { %>
  test('<%= getter %>', () => {
    const results = getters.<%= getter %>(context.state);

    /* TODO: fill expected value */
    expect(results).toEqual(null);
  });
<% }) -%>
<% } -%>
});