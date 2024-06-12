class CreateSixhats < ActiveRecord::Migration[7.0]
  def change
    create_table :sixhats do |t|
      t.bigint :user_id, null: false
      t.string :theme, null: false
      t.text :red
      t.text :white
      t.text :black
      t.text :green
      t.text :yellow
      t.text :blue

      t.timestamps
    end

    add_foreign_key :sixhats, :users, column: :user_id
    
  end
end
