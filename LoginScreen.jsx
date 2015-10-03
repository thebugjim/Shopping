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

  handleSignIn: function() {
    var myname = document.getElementById('inputEmail').value
    var mypass = document.getElementById('inputPassword').value
    Parse.User.logIn(myname, mypass, {
      success: function(user) {
        console.log('logged in', user)
        location.reload()
      },
      error: function(user, error) {
        console.log('failed log in', user, error)
      }
    })
  },

  handleSignUp: function() {
    var pass1 = document.getElementById('inputPassword3').value
    var pass2 = document.getElementById('inputPassword3-2').value

    if (pass1 !== pass2) return

    var user = new Parse.User();
    user.set("username", document.getElementById('inputEmail3').value);
    user.set("password", pass1);
    user.set("email", document.getElementById('inputEmail3').value);

    // other fields can be set just like with Parse.Object
    user.set("phoneNumber", document.getElementById('phonenumber').value);
    user.set("zipCode", document.getElementById('zipcode').value);
    user.set("noRequests", true);

    user.signUp(null, {
      success: function(user) {
        location.reload()
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },


  goToSignUp: function() {
    this.setState({
      showSignUp: true
    })
  },

  render: function() {
    if (this.state.showSignUp) 
      return (
        <div>
          <br/>
          <br/>
          <div className="form-horizontal">
            <center><h2>Sign up htmlFor BundleMe</h2></center>
            <div className="form-group">
              <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
              </div>
              <label htmlFor="inputPassword3" className="col-sm-2 control-label">Confirm Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3-2" placeholder="Password"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputzip" className="col-sm-2 control-label">Zip Code</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="zipcode" size="5" placeholder="Zip Code"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputphone" className="col-sm-2 control-label">Phone Number</label>
              <div className="col-sm-10">
                <input type="tel" className="form-control" id="phonenumber" placeholder="Phone Number"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default" onClick={this.handleSignUp}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      )
    

    // Render the text of each comment as a list item
    return (
      <div className="container">

        <div className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Username/Email address" required autofocus/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"> Remember me </input>
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSignIn}>Sign in</button>
          <br/>
          <br/>
          <h2 className="form-signin-heading">Or sign up</h2>
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.goToSignUp}>Sign up</button>
        </div>

      </div>
      // <ul>
      //   {this.data.comments.map(function(c) {
      //     return <li>{c.text}</li>;
      //   })}
      // </ul>
    );
  }
});