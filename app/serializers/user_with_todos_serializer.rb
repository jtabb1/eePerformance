class UserWithTodosSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :todos
  has_many :common_todos
end
