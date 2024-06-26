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

ActiveRecord::Schema[7.0].define(version: 2024_06_26_112519) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sixhats", force: :cascade do |t|
    t.decimal "uid", null: false
    t.string "theme", null: false
    t.text "red"
    t.text "white"
    t.text "black"
    t.text "green"
    t.text "yellow"
    t.text "blue"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", primary_key: "uid", id: :decimal, force: :cascade do |t|
    t.string "provider", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  add_foreign_key "sixhats", "users", column: "uid", primary_key: "uid"
end
