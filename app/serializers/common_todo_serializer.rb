class CommonTodoSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :type_id, :to_display, :todo_name
  has_one :user
  has_one :type
end
