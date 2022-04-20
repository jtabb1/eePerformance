class CreateTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :types do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :type_name

      t.timestamps
    end
  end
end