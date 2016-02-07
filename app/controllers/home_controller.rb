class HomeController < ApplicationController
  def index
    @comments = Comment.all
    props = { comments: @comments, url: '/comments' }
    render component: 'CommentArea', props: props, tag: 'span', class: 'comment'
  end
end
