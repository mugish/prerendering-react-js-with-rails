var CommentArea = React.createClass({
  getInitialState: function() {
    return { comments: this.props.comments, isLoading: false };
  },

  handleCommentSubmit: function(message) {
    message.id = new Date();
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(comment) {
        this.setState({ comments: this.state.comments.concat(comment) });
      }.bind(this),
      error: function(_xhr, status, error) {
        console.error(this.props.url, status, error.toString());
      }.bind(this)
    });
  },

  render: function() {

    var commentItems = this.state.comments.map(function(comment) {
      return (
        <CommentItem key={comment.id} comment={comment} />
      );
    });

    return (
      <div>
        {commentItems}
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
