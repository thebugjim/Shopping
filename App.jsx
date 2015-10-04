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
          if (object.get('status') == 0) {
          //display the pending request page
            self.setState({
              page: 'PendingPage'
            })
            return;
          }
        }
        self.setState({
          page: 'OrderPage'
        })
      },
    })
  },

  logout: function() {
    Parse.User.logOut()
    location.reload()
  },

  render: function() {
    console.log(this.state.page)
    if (!Parse.User.current())
      return (
        <LoginScreen />
      );

    if (this.state.page === 'OrderPage') {
      return (
        <div>
        <OrderPage />
        <center><div className="form-inline" role="form">
            <button className="btn btn-lg btn-primary " style={{backgroundColor: '#FFBC00'}} type="submit" onClick={this.logout}>Logout</button>
        </div></center>
        </div>
      )
    }

    if (this.state.page === 'MatchPage') {
      return (
        <div>
        <MatchPage />
        </div>
      )
    }

    return (
      <div>
        <div className="starter-template">
          <h1 style={{color: '#000000'}}>Sorry, you have not been matched yet...</h1>
          <p className="lead" style={{color: '#000000'}}>Please check back soon!</p>
        </div>
        <button onClick={Parse.User.logOut}>Logout</button>
      </div>
    )
  }
});
React.render(
  <App />,
  document.getElementById('content')
);