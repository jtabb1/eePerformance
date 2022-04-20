class User < ApplicationRecord
  has_many :todos, dependent: :destroy
  has_many :types, through: :todos
  has_many :common_todos, dependent: :destroy
  has_many :types, through: :common_todos

  has_secure_password

  def self.create_with_starter_types_and_todos(args)
    user = User.create(args)
    StarterTypedTodo.all.each do |obj|
      type = Type.find_or_create_by(user_id: user.id, type_name: obj.type_name)
      # There is an optimization opportunity here to eliminate the 'to_display' below and in the associated files of this project
      CommonTodo.find_or_create_by(user_id: user.id, type_id: type.id, todo_name: obj.todo_name, todo_notes: obj.todo_notes, to_display: obj.to_display)
    end
    user
  end

  validates :username, presence: true, uniqueness: true
end
