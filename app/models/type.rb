class Type < ApplicationRecord
  has_many :todos
  has_many :common_todos
  has_many :users, through: :todos
  has_many :users, through: :common_todos

  validates :type_name, presence: true
end
