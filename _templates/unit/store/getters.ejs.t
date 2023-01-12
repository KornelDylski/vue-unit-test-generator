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
 * <%= storeName %> getters
 */
describe('<%= h.changeCase.pascal(storeName) %> getters', () => {
  
  beforeEach(() => {
    mocks.state = initState();
  });
<% data.getters.forEach((getter) => { %>
  test('should test "<%= getter %>" action', () => {
    const results = getters.<%= getter %>(mocks.state);

    /* TODO: fill expected value */
    expect(results).toEqual(null);
  });
<% }) -%>
});