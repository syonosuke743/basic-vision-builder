class Users < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: false do |t|
      t.numeric :uid, null: false, primary_key: true
      t.string :provider, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :uid, unique: true
    end
  end
end
