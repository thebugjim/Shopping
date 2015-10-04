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
          <div className="form-horizontal">
            <center><h2 style={{color: '#000000'}}>Sign up for BundleMe</h2></center>
            <br/>
            <div className="form-group">
              <label htmlFor="inputEmail3" style={{color: '#000000'}} className="col-sm-5 control-label">Email</label>
              <div className="col-sm-7">
                <input type="email" className="form-control" style={{width: "25%"}} id="inputEmail3" placeholder="example@gmail.com"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword3" style={{color: '#000000'}} className="col-sm-5 control-label">Password</label>
              <div className="col-sm-7">
                <input type="password" className="form-control" style={{width: "25%"}} id="inputPassword3" placeholder="Password"/>
              </div>
              <label htmlFor="inputPassword3" className="col-sm-5 control-label">Confirm Password</label>
              <div className="col-sm-7">
                <input type="password" className="form-control" style={{width: "25%"}} id="inputPassword3-2" placeholder="Password"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputzip" style={{color: '#000000'}} className="col-sm-5 control-label">Zip Code</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="zipcode" style={{width: "70px"}} placeholder="XXXXX" maxlength="5"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputphone" style={{color: '#000000'}} className="col-sm-5 control-label">Phone Number</label>
              <div className="col-sm-7">
                <input type="tel" className="form-control" style={{width: "130px"}} id="phonenumber" placeholder="(XXX) XXX-XXXX"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="carrier" style={{color: '#000000'}} className="col-sm-5 control-label" style={{color: '#000000'}}>Carrier</label>
              <div className="col-sm-7">
                <select id="carrier" className="form-control" style={{width: '90px'}}>
                  <option></option>
                  <option>AT&T</option>
                  <option>Sprint</option>
                  <option>T-Mobile</option>
                  <option>Verizon</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
              </div>
            </div>
            <div className="form-group">
              <center><button type="submit" style={{backgroundColor: '#FFBC00'}} className="btn btn-lg btn-primary" onClick={this.handleSignUp}>Sign up</button></center>
            </div>
          </div>
        </div>
      )
    

    // Render the text of each comment as a list item
    return (
      <div>
        <img style={{float: 'left', width: '35%', marginLeft: '10px'}} src='logo.png'/>
        <div className="container" style={{float: 'right', width: '60%'}}>
          <div className="form-signin">
            <h1 className="form-signin-heading" style={{color: '#000000'}}>Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Username/Email address" required autofocus/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          </div>
          <center><div className="form-signin" role="form">
              <button className="btn btn-lg btn-primary " style={{backgroundColor: '#FFBC00'}} type="submit" onClick={this.handleSignIn}>Sign in</button>
              <button className="btn btn-lg btn-primary" style={{backgroundColor: '#FFBC00'}} type="submit" onClick={this.goToSignUp}>Sign up</button>
          </div></center>
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