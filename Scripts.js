'use strict';

var LoginScreen = React.createClass({
  displayName: 'LoginScreen',

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function getInitialState() {
    return {};
  },

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  handleSignIn: function handleSignIn() {
    var myname = document.getElementById('inputEmail').value;
    var mypass = document.getElementById('inputPassword').value;
    Parse.User.logIn(myname, mypass, {
      success: function success(user) {
        console.log('logged in', user);
        location.reload();
      },
      error: function error(user, _error) {
        console.log('failed log in', user, _error);
      }
    });
  },

  handleSignUp: function handleSignUp() {
    var pass1 = document.getElementById('inputPassword3').value;
    var pass2 = document.getElementById('inputPassword3-2').value;

    if (pass1 !== pass2) return;

    var user = new Parse.User();
    user.set("username", document.getElementById('inputEmail3').value);
    user.set("password", pass1);
    user.set("email", document.getElementById('inputEmail3').value);

    // other fields can be set just like with Parse.Object
    user.set("phoneNumber", document.getElementById('phonenumber').value);
    user.set("zipCode", document.getElementById('zipcode').value);

    user.signUp(null, {
      success: function success(user) {
        location.reload();
        // Hooray! Let them use the app now.
      },
      error: function error(user, _error2) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + _error2.code + " " + _error2.message);
      }
    });
  },

  goToSignUp: function goToSignUp() {
    this.setState({
      showSignUp: true
    });
  },

  render: function render() {
    if (this.state.showSignUp) return React.createElement(
      'div',
      null,
      React.createElement('br', null),
      React.createElement('br', null),
      React.createElement(
        'div',
        { className: 'form-horizontal' },
        React.createElement(
          'center',
          null,
          React.createElement(
            'h2',
            null,
            'Sign up htmlFor BundleMe'
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputEmail3', className: 'col-sm-2 control-label' },
            'Email'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-10' },
            React.createElement('input', { type: 'email', className: 'form-control', id: 'inputEmail3', placeholder: 'Email' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputPassword3', className: 'col-sm-2 control-label' },
            'Password'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-10' },
            React.createElement('input', { type: 'password', className: 'form-control', id: 'inputPassword3', placeholder: 'Password' })
          ),
          React.createElement(
            'label',
            { htmlFor: 'inputPassword3', className: 'col-sm-2 control-label' },
            'Confirm Password'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-10' },
            React.createElement('input', { type: 'password', className: 'form-control', id: 'inputPassword3-2', placeholder: 'Password' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputzip', className: 'col-sm-2 control-label' },
            'Zip Code'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-10' },
            React.createElement('input', { type: 'text', className: 'form-control', id: 'zipcode', size: '5', placeholder: 'Zip Code' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputphone', className: 'col-sm-2 control-label' },
            'Phone Number'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-10' },
            React.createElement('input', { type: 'tel', className: 'form-control', id: 'phonenumber', placeholder: 'Phone Number' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('div', { className: 'col-sm-offset-2 col-sm-10' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'div',
            { className: 'col-sm-offset-2 col-sm-10' },
            React.createElement(
              'button',
              { type: 'submit', className: 'btn btn-default', onClick: this.handleSignUp },
              'Sign up'
            )
          )
        )
      )
    );

    // Render the text of each comment as a list item
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'form-signin' },
        React.createElement(
          'h2',
          { className: 'form-signin-heading' },
          'Please sign in'
        ),
        React.createElement(
          'label',
          { htmlFor: 'inputEmail', className: 'sr-only' },
          'Email address'
        ),
        React.createElement('input', { type: 'email', id: 'inputEmail', className: 'form-control', placeholder: 'Username/Email address', required: true, autofocus: true }),
        React.createElement(
          'label',
          { htmlFor: 'inputPassword', className: 'sr-only' },
          'Password'
        ),
        React.createElement('input', { type: 'password', id: 'inputPassword', className: 'form-control', placeholder: 'Password', required: true }),
        React.createElement(
          'div',
          { className: 'checkbox' },
          React.createElement(
            'label',
            null,
            React.createElement(
              'input',
              { type: 'checkbox', value: 'remember-me' },
              ' Remember me '
            )
          )
        ),
        React.createElement(
          'button',
          { className: 'btn btn-lg btn-primary btn-block', type: 'submit', onClick: this.handleSignIn },
          'Sign in'
        ),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
          'h2',
          { className: 'form-signin-heading' },
          'Or sign up'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-lg btn-primary btn-block', type: 'submit', onClick: this.goToSignUp },
          'Sign up'
        )
      )
    )
    // <ul>
    //   {this.data.comments.map(function(c) {
    //     return <li>{c.text}</li>;
    //   })}
    // </ul>
    ;
  }
});
"use strict";

var LoginScreen = React.createClass({
  displayName: "LoginScreen",

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function getInitialState() {
    return {};
  },

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "center",
        null,
        React.createElement(
          "h2",
          null,
          "Welcome to BundleMe"
        )
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "center",
        null,
        React.createElement(
          "h3",
          null,
          "Add an order"
        )
      ),
      React.createElement(
        "form",
        { "class": "form-inline" },
        React.createElement(
          "div",
          { "class": "form-group" },
          React.createElement(
            "label",
            { "for": "orderurl" },
            "Order URL"
          ),
          React.createElement("input", { type: "url", "class": "form-control", id: "orderurl", size: "50%", placeholder: "www.amazon.com/example" })
        ),
        React.createElement(
          "div",
          { "class": "form-group" },
          React.createElement(
            "label",
            { "for": "price" },
            "Price"
          ),
          React.createElement(
            "div",
            { "class": "input-group" },
            React.createElement(
              "div",
              { "class": "input-group-addon" },
              "$"
            ),
            React.createElement("input", { type: "text", "class": "form-control", size: "4", id: "price", placeholder: "XX.XX" })
          )
        )
      ),
      React.createElement(
        "form",
        null,
        React.createElement(
          "div",
          { "class": "form-group" },
          React.createElement("div", { "class": "col-sm-offset-2 col-sm-10" })
        ),
        React.createElement(
          "div",
          { "class": "form-group" },
          React.createElement(
            "div",
            { "class": "col-sm-offset-2 col-sm-10" },
            React.createElement(
              "button",
              { type: "button", "class": "btn btn-default" },
              "Add another item"
            )
          )
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(
          "div",
          { "class": "form-group" },
          React.createElement(
            "div",
            { "class": "col-sm-offset-2 col-sm-10" },
            React.createElement(
              "button",
              { type: "submit", "class": "btn btn-default" },
              "Submit Order"
            )
          ),
          React.createElement(
            "p",
            null,
            "Note: total of orders must be at least $7.00"
          )
        )
      )
    );
  }
});
"use strict";

Parse.initialize("jAXTJpHdBxRMFMXeP29jf7EaSf0S0O325IQJf68L", "DjSOeoEzzt9ueNWpjsP8fRy8CQWW1XegcKVtD1gs");
var App = React.createClass({
  displayName: "App",

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function getInitialState() {
    return {};
  },

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      comments: new Parse.Query('Comment').ascending('createdAt')
    };
  },

  checkRequests: function checkRequests() {

    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var myUserId = Parse.User.current().id;

    query.equalTo("userObjectId", myUserId);
    query.find({
      success: function success(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if (object.get('status') == 0) {
            //display the pending request page
            console.log(0);
          }
          if (object.get('status') == 1) {
            console.log(1);
            //show the matched page
          }
        }
      }
    });
  },

  createRequest: function createRequest(requestItemUrl, requestItemPrice) {

    // front end does this over a loop
    // requestItemUrl.push( );
    // requestItemPrice.push( );
    // FRONT-END TODO

    var myUserId = Parse.User.current().id;

    var Requests = Parse.Object.extend('Requests');

    // create a request for the user
    var requests = new Requests();
    requests.set('userObjectId', myUserId);

    requests.save(null, {
      success: function success(requests) {
        //alert('New object created with objectId: '+requests.id);
      },
      error: function error(requests, _error) {
        alert('Failed to create new object ' + _error.message);
      }
    });

    var myRequestsId = requests.get('objectId');

    var RequestItems = Parse.Object.extend('RequestItems');

    var myTotalPrice = 0;

    // create a request item for the user associated with the request
    for (var i = 0; i < requestItemUrl.length; i++) {
      var requestItems = new RequestItems();

      requestItems.set('userObjectId', myUserId);
      requestItems.set('requestsObjectId', myRequestsId);
      requestItems.set('url', requestItemUrl[i]);
      requestItems.set('itemPrice', requestItemPrice[i]);

      myTotalPrice += requestItemPrice[i];

      requestItems.save(null, {
        success: function success(requestItems) {
          //alert('New object created with objectId: '+ requestItems.id);
        },
        error: function error(requestItems, _error2) {
          alert('Failed to create new object ' + _error2.message);
        }
      });
    }

    // update total price for the request

    requests.set('totalPrice', myTotalPrice);
    requests.save(null, {
      success: function success(requests) {
        //alert('New object created with objectId: '+requests.id);
      },
      error: function error(requests, _error3) {
        alert('Failed to create new object ' + _error3.message);
      }
    });
  },

  render: function render() {
    if (!Parse.User.current()) return React.createElement(LoginScreen, null);

    if (this.state.showOrderPage) {
      return React.createElement(OrderPage, null);
    }

    return React.createElement(
      "div",
      null,
      "Logged in as ",
      Parse.User,
      React.createElement(
        "button",
        { onClick: Parse.User.logOut },
        "Logout"
      ),
      React.createElement(
        "button",
        { onClick: this.checkRequests },
        "Check Requests"
      ),
      React.createElement(
        "button",
        { onClick: this.createRequest },
        "Create Request"
      )
    );
  }
});
React.render(React.createElement(App, null), document.getElementById('content'));

