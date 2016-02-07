## Install && Setup

- https://github.com/reactjs/react-rails
- 以下からturbolinkを削除
    - Gemfile
    - app/assets/javascripts/application.js
    - app/views/layouts/application.html.erb

\# Gemfile

```
gem 'react-rails', '~> 1.6.0'
```

\# config/environments/development.rb

```
config.react.variant = :development
```

\# config/environments/production.rb

```
config.react.variant = :production
```


```
bundle install --vendor/bundle
rails g react:install
```

## Generate files

```
rails g controller home index
rails g controller comments create
rails g model comment name:string message:text
bundle exec rake db:migrate
```

\# config/routes.rb

```
Rails.application.routes.draw do
  root 'home#index'
  resources :comments, only: [:create]
end
```

## Controller

\# app/controllers/home_controller.rb

```
class HomeController < ApplicationController
  def index
    @comments = Comment.all
    props = { comments: @comments, url: '/comments' }
    render component: 'CommentArea', props: props, tag: 'span', class: 'comment'
  end
end
```

\# app/controllers/comments_controller.rb
```
class CommentsController < ApplicationController
  def create
    comment = Comment.create(comment_params)
    render json: comment, status: :created
  end

  private
    def comment_params
      params.permit(:name, :message)
    end
end
```

## JSX

\# app/assets/javascripts/components/comment_form.js.jsx

```
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
```

\# app/assets/javascripts/components/comment_item.js.jsx

```
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
```

\# app/assets/javascripts/components/comment.js.jsx

```
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
```


