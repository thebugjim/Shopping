Parse.initialize("jAXTJpHdBxRMFMXeP29jf7EaSf0S0O325IQJf68L", "DjSOeoEzzt9ueNWpjsP8fRy8CQWW1XegcKVtD1gs");
var App = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function() {
    return {}
  },

  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  componentDidMount: function() {
    this.checkRequests()
  },

  checkRequests: function() {

    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var myUserId = Parse.User.current().id;

    query.equalTo("userObjectId", myUserId);
    var self = this;
    query.find({
      success: function(results) {
        if (results.length === 0) {
          self.setState({
            page: 'OrderPage'
          })
        }

        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if(object.get('status') == 1)
          {
            //show the matched page
            self.setState({
              page: 'MatchPage'
            })
            return;
          }
          // //display the pending request page
          // self.setState({
          //   page: 'PendingPage'
          // })
          // return;
        }
      },
    })
  },

  render: function() {
    console.log(this.state.page)
    if (!Parse.User.current())
      return (
        <LoginScreen />
      );

    if (this.state.page === 'OrderPage') {
      return (
        <OrderPage />
      )
    }

    if (this.state.page === 'MatchPage') {
      return (
        <MatchPage />
      )
    }

    return (
      <div>
        Logged in as {Parse.User}
        <button onClick={Parse.User.logOut}>Logout</button>
        <button onClick={this.checkRequests}>Check Requests</button>
        <button onClick={this.createRequest}>Create Request</button>
      </div>
    )
  }
});
React.render(
  <App />,
  document.getElementById('content')
);