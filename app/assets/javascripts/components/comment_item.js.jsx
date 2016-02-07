var CommentItem = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="comment-user">{this.props.comment.name}</h2>
        <span className="comment-message">{this.props.comment.message}</span>
      </div>
    );
  }
});
