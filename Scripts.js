"use strict";

var LoginScreen = React.createClass({
  displayName: "LoginScreen",

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  render: function render() {
    // Render the text of each comment as a list item
    return React.createElement(
      "div",
      { className: "commentBox" },
      "Login"
    )
    // <ul>
    //   {this.data.comments.map(function(c) {
    //     return <li>{c.text}</li>;
    //   })}
    // </ul>
    ;
  }
});
'use strict';

var App = React.createClass({
  displayName: 'App',

  mixins: [ParseReact.Mixin], // Enable query subscriptions

  observe: function observe() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  render: function render() {
    // Render the text of each comment as a list item
    return React.createElement(LoginScreen, null)
    // <ul>
    //   {this.data.comments.map(function(c) {
    //     return <li>{c.text}</li>;
    //   })}
    // </ul>
    ;
  }
});
React.render(React.createElement(App, null), document.getElementById('content'));

