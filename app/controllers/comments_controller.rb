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
