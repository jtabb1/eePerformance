class CreateCommonTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :common_todos do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :type, null: false, foreign_key: true
      t.string :to_display
      t.string :todo_name
      t.string :todo_notes

      t.timestamps
    end
  end
end