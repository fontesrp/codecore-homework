class CommentsController < ApplicationController

    before_action :find_post

    def create

        @comment = Comment.new comment_params
        @comment.post = @post

        if @comment.save
            redirect_to @post
        else
            render 'posts/show'
        end
    end

    def destroy
        find_comment
        @comment.destroy
        redirect_to @post
    end

    private

    def find_comment
        @comment = Comment.find params.require(:id)
    end

    def find_post
        @post = Post.find params.require(:post_id)
    end

    def comment_params
        params.require(:comment).permit(:body)
    end
end
