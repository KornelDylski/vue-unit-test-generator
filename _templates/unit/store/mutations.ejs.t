---
to: <%= dir %>/<%= testDir %>/<%= specName %>.spec.js
---
<% data = JSON.parse(locals.data) -%>
<% if (data.importFile) { -%>
import { state as initState } from '../<%= data.importFile %>';
<% } else { -%>
import initState from '../state';
<% } -%>

const mocks = {
  state: initState(),  
};

/**
 * <%= storeName %> mutations
 */
describe('<%= h.changeCase.pascal(storeName) %> mutations', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });
<% data.mutations.forEach((mutation) => { %>
  test('<%= mutation %>', () => {
    const params = {};
    mutations.<%= mutation %>(mocks.state, params);

    /* TODO: fill expected changes in state */
    expect(mocks.state).toEqual(null);
  });
<% }) -%>
});