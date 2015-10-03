var LoginScreen = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions

  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      //comments: (new Parse.Query('Comment')).ascending('createdAt')
    };
  },

  render: function() {
    // Render the text of each comment as a list item
    return (
      <div className="commentBox">
        Login
      </div>
      // <ul>
      //   {this.data.comments.map(function(c) {
      //     return <li>{c.text}</li>;
      //   })}
      // </ul>
    );
  }
});