# app/models/sixhat.rb

class Sixhat < ApplicationRecord
    belongs_to :user, foreign_key: 'uid', primary_key: 'uid'

    validates :uid, presence: true
    validates :theme, presence: true
    validates :white, presence: true
    validates :red, presence: true
    validates :black, presence: true
    validates :yellow, presence: true
    validates :green, presence: true
    validates :blue, presence: true
end


