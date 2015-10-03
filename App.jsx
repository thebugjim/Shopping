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

  checkRequests: function() {

    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var myUserId = Parse.User.current().id;

    query.equalTo("userObjectId", myUserId);
    query.find({
      success: function(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if(object.get('status') == 0)
          {
            //display the pending request page
            console.log(0)
          }
          if(object.get('status') == 1)
          {
            console.log(1)
            //show the matched page
          }
        }
      },
    })
  },

  createRequest: function(requestItemUrl, requestItemPrice) {

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
            success: function(requests) {
                 //alert('New object created with objectId: '+requests.id);
                            },
            error:function(requests, error) {
                 alert('Failed to create new object '+ error.message);
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
                success: function(requestItems) {
                    //alert('New object created with objectId: '+ requestItems.id);
                },
                error:function(requestItems, error) {
                    alert('Failed to create new object '+ error.message);
                }
            });
    }

    // update total price for the request

    requests.set('totalPrice', myTotalPrice);
    requests.save(null, {
            success: function(requests) {
                 //alert('New object created with objectId: '+requests.id);
            },
            error:function(requests, error) {
                 alert('Failed to create new object '+ error.message);
            }
    });
  },

  render: function() {
    if (!Parse.User.current())
      return (
        <LoginScreen />
      );

    if (this.state.page === 'OrderPage') {
      return (
        <OrderPage />
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