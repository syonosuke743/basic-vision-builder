# app/models/sixhat.rb

class Sixhat < ApplicationRecord
    belongs_to :user, foreign_key: 'uid', primary_key: 'uid'
end


