class MeowsController < ApplicationController
  before_filter :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    meow = current_user.meows.build
    meow.post = post

    # if meow.save
    #
    # else
    #   redirect_to :back
    # end

    respond_to do |format|
      if meow.save
        format.html { redirect_to :back, notice: "We heard your Meow!" }
        format.json { render json: meow }
      else
        format.html { redirect_to :back }
        format.json { render json: meow.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    current_user.meows.destroy(params[:id])
    redirect_to :back, notice: "All evidence of your meowing has been destroyed!"
  end
end
