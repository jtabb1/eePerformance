class Api::TypesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    render json: Type.where(user_id: @current_user.id)
  end

  def show
    type = find_type
    render json: type
  end

  def update
    type = find_type
    type.update(type_params)
    render json: type
  end

  def destroy
    type = find_type
    type.destroy
    head :no_content
  end

  def create
    type = Type.create!(type_params)
    render json: type, status: :created
  end

  private

  def type_params
    params.permit(:type_name, :public_id)
  end
  
  def find_type
    Type.find(params[:id])
  end

  def render_not_found_response
    render json: { error: "Type not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
