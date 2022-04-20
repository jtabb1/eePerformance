class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :type, null: false, foreign_key: true
      t.string :todo_name
      t.string :todo_notes
      t.boolean :is_done, default: false
      t.boolean :is_shown_in_todos, default: true

      t.timestamps
    end
  end
end