var MatchPage = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function() {
    return {
      rows: []
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
    this.getMatchedObjectID()
  },

  getMatchedObjectID: function() {
    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var myUserId = Parse.User.current().id;

    query.equalTo("userObjectId", myUserId);
    var self = this
    query.find({
      success: function(results) {
        if (results.length === 0) {
          return null;
        }

        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          if(object.get('status') == 1)
          {
            console.log(object.get('matchedObjectId'))
            self.setState({
              matchedObjectId: object.get('matchedObjectId')
            })
          }
        }
        return null;
      },
    })
    .then(this.getMatches)
  },

  getMatches: function() {
    var Requests = Parse.Object.extend("Requests");
    var query = new Parse.Query(Requests);

    var matchedObjectId = this.state.matchedObjectId;
    if (!matchedObjectId) {
      console.log('match object id is null')
      return
    }

    query.equalTo("matchedObjectId", matchedObjectId);
    var self = this
    var matches = []
    console.log('aaaa', matchedObjectId)
    query.find({
      success: function(results) {
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          matches.push(object)
          console.log(object)
        }
        self.setState({
          matches: matches
        })
      },
    })
    .then(this.generateRows)
  },

  generateRows: function() {
    if (!this.state || !this.state.matches) return

    var self = this

    this.state.matches.map(function(item){
      console.log(item)

      var User = Parse.Object.extend("User");
      var query = new Parse.Query(User);

      query.equalTo("objectId", item.get('userObjectId'));
      query.find({
        success: function(results) {

          var RequestItems = Parse.Object.extend("RequestItems");
          var query2 = new Parse.Query(RequestItems);
          query2.equalTo("userObjectId", item.get('userObjectId'));
          query2.find({

            success: function(results) {
              var items = []

              for(var i = 0; i < results.length; i++)
              {
                var object = results[i];
                var url = object.get("url");
                var itemprice = object.get("itemPrice");
                //display this item
                items.push((<tr key={i}>
                  <td></td>
                  <td>{url}</td>
                  <td>{itemprice}</td>
                </tr>))
              }
              var rows = self.state.rows
              rows.push(
                <tr key={Date.now()}>
                  <td>
                  <table className="table">
                    <tr>
                      <th>example1@gmail.com</th>
                      <th>Item URL</th>
                      <th>Price</th>
                    </tr>
                    {items}
                  </table></td>
                </tr>
              )
              self.setState({
                rows
              })
            }
          })
        }
      })
    })
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="main">
            <center><h1 className="page-header">Matches</h1></center>
            <div className="table-responsive">
              <table className="table table-striped">
                  {this.state.rows}
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
})