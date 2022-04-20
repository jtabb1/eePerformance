class TodoSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :type_id, :todo_name, :is_done, :is_shown_in_todos
  has_one :user
  has_one :type
end
