import React from 'react';
import Login from './src/components/forms/login';

describe ('login', function() {
  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = React.addons.TestUtils;

  var app;

  describe('When rendering a blank login page', function() {
    beforeEach(function() {
      app = renderIntoDocument(
        <App/>
      );
    });

    it('should be a stateful class component', function() {
      expect(React.Component.isPrototypeOf(Login)).to.be.true;
    });

  // - does a valid login go through
  // - does a successful login redirect me
  // - does it prevent me from logging in when i don’t enter a username and password
  // - does the link to signup page redirect me appropriately
  // - does an invalid login from the server give me a meaningful error message
  });
});
