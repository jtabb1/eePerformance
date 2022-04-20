class UserWithTypesSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :types
end
