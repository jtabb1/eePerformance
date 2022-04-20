# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_07_000006) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "common_todos", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "type_id", null: false
    t.string "to_display"
    t.string "todo_name"
    t.string "todo_notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["type_id"], name: "index_common_todos_on_type_id"
    t.index ["user_id"], name: "index_common_todos_on_user_id"
  end

  create_table "starter_typed_todos", force: :cascade do |t|
    t.string "type_name"
    t.string "to_display"
    t.string "todo_name"
    t.string "todo_notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "todos", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "type_id", null: false
    t.string "todo_name"
    t.string "todo_notes"
    t.boolean "is_done", default: false
    t.boolean "is_shown_in_todos", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["type_id"], name: "index_todos_on_type_id"
    t.index ["user_id"], name: "index_todos_on_user_id"
  end

  create_table "types", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "type_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_types_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "common_todos", "types"
  add_foreign_key "common_todos", "users"
  add_foreign_key "todos", "types"
  add_foreign_key "todos", "users"
  add_foreign_key "types", "users"
end
