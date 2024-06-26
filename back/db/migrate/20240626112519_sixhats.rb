class Sixhats < ActiveRecord::Migration[7.0]
  def change
    create_table :sixhats do |t|
      t.numeric :uid, null: false
      t.string :theme, null: false
      t.text :red
      t.text :white
      t.text :black
      t.text :green
      t.text :yellow
      t.text :blue
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.foreign_key :users, column: :uid, primary_key: :uid
    end
  end
end
