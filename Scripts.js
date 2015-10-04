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
    user.set("noRequests", true);

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
      React.createElement(
        'div',
        { className: 'form-horizontal' },
        React.createElement(
          'center',
          null,
          React.createElement(
            'h2',
            { style: { color: '#000000' } },
            'Sign up for BundleMe'
          )
        ),
        React.createElement('br', null),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputEmail3', style: { color: '#000000' }, className: 'col-sm-5 control-label' },
            'Email'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-7' },
            React.createElement('input', { type: 'email', className: 'form-control', style: { width: "25%" }, id: 'inputEmail3', placeholder: 'example@gmail.com' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputPassword3', style: { color: '#000000' }, className: 'col-sm-5 control-label' },
            'Password'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-7' },
            React.createElement('input', { type: 'password', className: 'form-control', style: { width: "25%" }, id: 'inputPassword3', placeholder: 'Password' })
          ),
          React.createElement(
            'label',
            { htmlFor: 'inputPassword3', className: 'col-sm-5 control-label' },
            'Confirm Password'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-7' },
            React.createElement('input', { type: 'password', className: 'form-control', style: { width: "25%" }, id: 'inputPassword3-2', placeholder: 'Password' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputzip', style: { color: '#000000' }, className: 'col-sm-5 control-label' },
            'Zip Code'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-7' },
            React.createElement('input', { type: 'text', className: 'form-control', id: 'zipcode', style: { width: "70px" }, placeholder: 'XXXXX', maxlength: '5' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'inputphone', style: { color: '#000000' }, className: 'col-sm-5 control-label' },
            'Phone Number'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-7' },
            React.createElement('input', { type: 'tel', className: 'form-control', style: { width: "130px" }, id: 'phonenumber', placeholder: '(XXX) XXX-XXXX' })
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'carrier', style: { color: '#000000' }, className: 'col-sm-5 control-label', style: { color: '#000000' } },
            'Carrier'
          ),
          React.createElement(
            'div',
            { className: 'col-sm-7' },
            React.createElement(
              'select',
              { id: 'carrier', className: 'form-control', style: { width: '90px' } },
              React.createElement('option', null),
              React.createElement(
                'option',
                null,
                'AT&T'
              ),
              React.createElement(
                'option',
                null,
                'Sprint'
              ),
              React.createElement(
                'option',
                null,
                'T-Mobile'
              ),
              React.createElement(
                'option',
                null,
                'Verizon'
              )
            )
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
            'center',
            null,
            React.createElement(
              'button',
              { type: 'submit', style: { backgroundColor: '#FFBC00' }, className: 'btn btn-lg btn-primary', onClick: this.handleSignUp },
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
          'h1',
          { className: 'form-signin-heading', style: { color: '#000000' } },
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
        React.createElement('input', { type: 'password', id: 'inputPassword', className: 'form-control', placeholder: 'Password', required: true })
      ),
      React.createElement(
        'center',
        null,
        React.createElement(
          'div',
          { className: 'form-inline', role: 'form' },
          React.createElement(
            'button',
            { className: 'btn btn-lg btn-primary ', style: { backgroundColor: '#FFBC00' }, type: 'submit', onClick: this.handleSignIn },
            'Sign in'
          ),
          React.createElement(
            'button',
            { className: 'btn btn-lg btn-primary', style: { backgroundColor: '#FFBC00' }, type: 'submit', onClick: this.goToSignUp },
            'Sign up'
          )
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

var MatchPage = React.createClass({
  displayName: "MatchPage",

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function getInitialState() {
    return {
      rows: []
    };
  },

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  componentDidMount: function componentDidMount() {
    this.getMatchedObjectID();
  },

  getMatchedObjectID: function getMatchedObjectID() {
    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var myUserId = Parse.User.current().id;

    query.equalTo("userObjectId", myUserId);
    var self = this;
    query.find({
      success: function success(results) {
        if (results.length === 0) {
          return null;
        }

        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if (object.get('status') == 1) {
            console.log(object.get('matchedObjectId'));
            self.setState({
              matchedObjectId: object.get('matchedObjectId')
            });
          }
        }
        return null;
      }
    }).then(this.getMatches);
  },

  getMatches: function getMatches() {
    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var matchedObjectId = this.state.matchedObjectId;
    if (!matchedObjectId) {
      console.log('match object id is null');
      return;
    }

    query.equalTo("matchedObjectId", matchedObjectId);
    var self = this;
    var matches = [];
    console.log('aaaa', matchedObjectId);
    query.find({
      success: function success(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          matches.push(object);
          console.log(object);
        }
        self.setState({
          matches: matches
        });
      }
    }).then(this.generateRows);
  },

  generateRows: function generateRows() {
    if (!this.state || !this.state.matches) return;

    var self = this;

    this.state.matches.map(function (item) {
      console.log(item);

      var User = Parse.Object.extend("User");
      var query = new Parse.Query(User);

      query.equalTo("objectId", item.get('userObjectId'));
      query.find({
        success: function success(results) {

          var RequestItems = Parse.Object.extend("RequestItems");
          var query2 = new Parse.Query(RequestItems);
          query2.equalTo("userObjectId", item.get('userObjectId'));
          query2.find({

            success: function success(results2) {
              var items = [];

              for (var i = 0; i < results2.length; i++) {
                var object = results2[i];
                var url = object.get("url");
                var itemprice = object.get("itemPrice");
                //display this item
                items.push(React.createElement(
                  "tr",
                  { key: i },
                  React.createElement("td", null),
                  React.createElement(
                    "td",
                    null,
                    url
                  ),
                  React.createElement(
                    "td",
                    null,
                    itemprice
                  )
                ));
              }
              var rows = self.state.rows;
              rows.push(React.createElement(
                "tr",
                { key: Date.now() },
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    "table",
                    { className: "table", style: { tableLayout: 'fixed' } },
                    React.createElement(
                      "thead",
                      null,
                      React.createElement(
                        "tr",
                        null,
                        React.createElement(
                          "th",
                          null,
                          React.createElement(
                            "strong",
                            null,
                            results[0].get('email')
                          )
                        ),
                        React.createElement(
                          "th",
                          null,
                          React.createElement(
                            "strong",
                            null,
                            "Item URL"
                          )
                        ),
                        React.createElement(
                          "th",
                          null,
                          React.createElement(
                            "strong",
                            null,
                            "Price"
                          )
                        )
                      )
                    ),
                    items
                  )
                )
              ));
              self.setState({
                rows: rows
              });
            }
          });
        }
      });
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "main" },
          React.createElement(
            "center",
            null,
            React.createElement(
              "h1",
              { className: "page-header" },
              "Matches"
            )
          ),
          React.createElement(
            "div",
            { className: "table-responsive" },
            React.createElement(
              "table",
              { className: "table table-striped" },
              React.createElement(
                "tbody",
                null,
                this.state.rows
              )
            )
          )
        )
      )
    );
  }
});
'use strict';

var OrderPage = React.createClass({
  displayName: 'OrderPage',

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function getInitialState() {
    return {
      itemForms: [],
      i: 0
    };
  },

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  componentDidMount: function componentDidMount() {
    this.generateItemForm();
  },

  createRequest: function createRequest(requestItemUrl, requestItemPrice) {
    var urls = document.getElementsByClassName('itemurl');
    var requestItemUrl = [];
    for (var i = 0; i < urls.length; i++) requestItemUrl.push(urls[i].value);

    var prices = document.getElementsByClassName('itemprice');
    var requestItemPrice = [];
    for (var i = 0; i < urls.length; i++) requestItemPrice.push(parseFloat(prices[i].value));

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
    requests.set('status', 0);
    var self = this;
    requests.save(null, {
      success: function success(requests) {
        //alert('New object created with objectId: '+requests.id);
        self.tryToMatch();
      },
      error: function error(requests, _error3) {
        alert('Failed to create new object ' + _error3.message);
      }
    });
  },

  tryToMatch: function tryToMatch() {
    console.log('trying to match');
    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    query.equalTo("status", 0);

    var matchedPrice = 0;
    var matchedObjectId = "matched";
    query.find({
      success: function success(results) {

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          matchedPrice += object.get('totalPrice');
          var concat = object.get('userObjectId');
          matchedObjectId += concat;
          if (matchedPrice >= 35) {
            for (i; i >= 0; i--) {
              var object = results[i];
              object.set("status", 1);
              object.set("matchedObjectId", matchedObjectId);
              object.save();
            }
            break;
          }
        }
      },
      error: function error(_error4) {
        alert("Error: " + _error4.code + " " + _error4.message);
      }
    }).then(function () {
      location.reload();
    });
  },

  generateItemForm: function generateItemForm() {
    var newForm = React.createElement(
      'div',
      { className: 'form-inline', key: this.state.i++ },
      React.createElement(
        'center',
        null,
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'orderurl', style: { color: "#000000" } },
            'Order URL'
          ),
          React.createElement('input', { type: 'url', className: 'form-control itemurl', size: '200%', placeholder: 'www.amazon.com/example' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'price', style: { color: "#000000" } },
            'Price'
          ),
          React.createElement(
            'div',
            { className: 'input-group' },
            React.createElement(
              'div',
              { className: 'input-group-addon' },
              '$'
            ),
            React.createElement('input', { type: 'text', className: 'form-control itemprice', size: '4', placeholder: 'XX.XX' })
          )
        )
      )
    );
    var itemForms = this.state.itemForms;
    itemForms.push(newForm);
    this.setState({
      itemForms: itemForms
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('br', null),
      React.createElement('br', null),
      React.createElement(
        'center',
        null,
        React.createElement(
          'h2',
          { style: { color: "#000000" } },
          'Welcome to BundleMe'
        )
      ),
      React.createElement('br', null),
      React.createElement('br', null),
      React.createElement(
        'center',
        null,
        React.createElement(
          'h3',
          { style: { color: "#000000" } },
          'Add an order'
        )
      ),
      this.state.itemForms,
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('div', { className: 'col-sm-offset-2 col-sm-10' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'center',
            null,
            React.createElement(
              'button',
              { type: 'button', style: { backgroundColor: "#FFBC00" }, className: 'btn btn-primary', onClick: this.generateItemForm },
              'Add another item'
            )
          )
        ),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
          'center',
          null,
          React.createElement(
            'button',
            { type: 'submit', style: { backgroundColor: "#FFBC00" }, className: 'btn btn-lg btn-primary', onClick: this.createRequest },
            'Submit Order'
          ),
          React.createElement(
            'p',
            { style: { color: "#000000" } },
            'Note: total of orders must be at least $7.00'
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

  componentDidMount: function componentDidMount() {
    this.checkRequests();
  },

  checkRequests: function checkRequests() {

    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var myUserId = Parse.User.current().id;

    query.equalTo("userObjectId", myUserId);
    var self = this;
    query.find({
      success: function success(results) {
        if (results.length === 0) {
          self.setState({
            page: 'OrderPage'
          });
        }

        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if (object.get('status') == 1) {
            //show the matched page
            self.setState({
              page: 'MatchPage'
            });
            return;
          }
          // //display the pending request page
          // self.setState({
          //   page: 'PendingPage'
          // })
          // return;
        }
      }
    });
  },

  render: function render() {
    console.log(this.state.page);
    if (!Parse.User.current()) return React.createElement(LoginScreen, null);

    if (this.state.page === 'OrderPage') {
      return React.createElement(OrderPage, null);
    }

    if (this.state.page === 'MatchPage') {
      return React.createElement(MatchPage, null);
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "starter-template" },
        React.createElement(
          "h1",
          { style: { color: '#000000' } },
          "Sorry, you have not been matched yet..."
        ),
        React.createElement(
          "p",
          { className: "lead", style: { color: '#000000' } },
          "Please check back soon!"
        )
      ),
      React.createElement(
        "button",
        { onClick: Parse.User.logOut },
        "Logout"
      )
    );
  }
});
React.render(React.createElement(App, null), document.getElementById('content'));

