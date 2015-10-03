var LoginScreen = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions

  getInitialState: function() {
    return {}
  },

  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  render: function() {
    return (
      <div>
        <br/>
        <br/>
        <center><h2>Welcome to BundleMe</h2></center>
        <br/>
        <br/>
        <center><h3>Add an order</h3></center>






        
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="orderurl">Order URL</label>
            <input type="url" className="form-control" id="orderurl" size="50%" placeholder="www.amazon.com/example"/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input type="text" className="form-control" size="4" id="price" placeholder="XX.XX"/>
            </div>
          </div>
        </form>





        

      <form>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="button" className="btn btn-default">Add another item</button>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Submit Order</button>
          </div>
          <p>Note: total of orders must be at least $7.00</p>
        </div>
    </form>
      </div>
    )
  }
})