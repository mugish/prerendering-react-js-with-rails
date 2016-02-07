var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onCommentSubmit({ 
      name: this.refs.name.value.trim(), 
      message: this.refs.message.value.trim()
    });

    this.refs.name.value = '';
    this.refs.message.value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your Name" ref="name" />
        <input type="text" placeholder="Message..." ref="message" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
