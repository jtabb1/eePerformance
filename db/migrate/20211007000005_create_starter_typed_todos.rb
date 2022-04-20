class CreateStarterTypedTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :starter_typed_todos do |t|
      t.string :type_name
      t.string :to_display
      t.string :todo_name
      t.string :todo_notes

      t.timestamps
    end
  end
end