class Api::CommonTodosController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    render json: CommonTodo.where(user_id: @current_user.id)
  end

  private

  def todo_params
    params.permit(:user_id, :type_id, :todo_name, :todo_notes)
  end
  
  def find_todo
    CommonTodo.find(params[:id])
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
  
end
