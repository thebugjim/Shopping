var OrderPage = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function() {
    return {
      itemForms: [],
      i: 0
    }
  },

  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  componentDidMount: function() {
    this.generateItemForm()
  },

  createRequest: function(requestItemUrl, requestItemPrice) {
    var urls = document.getElementsByClassName('itemurl')
    var requestItemUrl = []
    for (var i = 0; i < urls.length; i++)
      requestItemUrl.push(urls[i].value)

    var prices = document.getElementsByClassName('itemprice')
    var requestItemPrice = []
    for (var i = 0; i < urls.length; i++)
      requestItemPrice.push(parseFloat(prices[i].value))


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
    requests.set('status', 0)
    var self = this;
    requests.save(null, {
            success: function(requests) {
                 //alert('New object created with objectId: '+requests.id);
                 self.tryToMatch()
            },
            error:function(requests, error) {
                 alert('Failed to create new object '+ error.message);
            }
    });
  },


tryToMatch: function() {
    console.log('trying to match')
    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    query.equalTo("status", 0)

    var matchedPrice = 0;
    var matchedObjectId = "matched";
    query.find({
      success: function(results) {

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          matchedPrice += object.get('totalPrice');
          var concat = object.get('userObjectId');
          matchedObjectId += concat;
          if(matchedPrice >= 35)
          {
            for (i; i >= 0; i--)
            {
              var object = results[i];
              object.set("status", 1);
              object.set("matchedObjectId", matchedObjectId);
              object.save();
            }
            break;
          }
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    })
    .then(function() {
      location.reload()
    });
  },

  generateItemForm: function() {
    var newForm = (
      <div className="form-inline" key={this.state.i ++}>
        <center>
        <div className="form-group">
          <label htmlFor="orderurl" style={{color: "#000000"}}>Order URL</label>
          <input type="url" className="form-control itemurl" size="200%" placeholder="www.amazon.com/example"/>
        </div>
        <div className="form-group">
          <label htmlFor="price" style={{color: "#000000"}}>Price</label>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control itemprice" size="4" placeholder="XX.XX"/>
          </div>
        </div>
        </center>
      </div>
    )
    var itemForms = this.state.itemForms
    itemForms.push(newForm)
    this.setState({
      itemForms
    })
  },

  render: function() {
    return (
      <div>
        <br/>
        <br/>
        <center><h2 style={{color: "#000000"}}>Welcome to BundleMe</h2></center>
        <br/>
        <br/>
        <center><h3 style={{color: "#000000"}}>Add an order</h3></center>

        {this.state.itemForms}

          <div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
              </div>
            </div>
            <div className="form-group">
              <center><button type="button" style={{backgroundColor: "#FFBC00"}} className="btn btn-primary" onClick={this.generateItemForm}>Add another item</button></center>
            </div>
            <br/>
            <br/>
            <br/>
            <center>
              <button type="submit" style={{backgroundColor: "#FFBC00"}} className="btn btn-lg btn-primary" onClick={this.createRequest}>Submit Order</button>
              <p style={{color: "#000000"}}>Note: total of orders must be at least $7.00</p>
            </center>
        </div>
      </div>
    )
  }
})