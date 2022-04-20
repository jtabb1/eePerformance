class Api::UsersController < ApplicationController

  # Draft line deletion:
  # rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  skip_before_action :authorize, only: :create # <-Drafted line from Fn example

  # Draft method deletion:
  # def index
  #   render json: User.order("id")
  # end

  def show
    # Draft deletion -> user = find_user
    # Drafted modfication of line below from Flatiron example:
    #
    #
    # @current_user below is probably needed for the sake of security
    #  of other users from this user's account
    render json: @current_user, serializer: UserWithTodosSerializer
  end

  # Draft method deletion:
  # def update
  #   user = find_user
  #   user.update(user_params)
  #   render json: user
  # end

  # Draft method deletion:
  # def destroy
  #   user = find_user
  #   user.destroy
  #   head :no_content
  # end
  
  # Drafted method from Flatiron example:
  def create
    user = User.create_with_starter_types_and_todos(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private

  def user_params
    # Drafted modfication of line below from Flatiron example:
    params.permit(:username, :password, :password_confirmation)
  end

  # Draft method deletion:
  # def find_user
  #   User.find(params[:id])
  # end

  # Draft method deletion:
  # def render_not_found_response
  #   render json: { error: "User not found" }, status: :not_found
  # end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
