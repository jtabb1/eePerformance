class Api::TodosController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    render json:  
      Todo
        .where(user_id: @current_user.id)
  end

  def show
    todo = find_todo
    render json: todo
  end

  def update
    todo = find_todo
    todo.update(todo_params)
    render json: todo
  end

  def destroy
    todo = find_todo
    todo.destroy
    head :no_content
  end

  def create
    todo = Todo.create!(todo_params)
    render json: todo, status: :created
  end

  private

  def todo_params
    params.permit(:user_id, :type_id, :todo_name, :todo_notes, :is_done, :is_shown_in_todos)
  end
  
  def find_todo
    Todo.find(params[:id])
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
  
end
