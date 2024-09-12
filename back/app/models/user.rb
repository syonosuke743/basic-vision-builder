class User < ApplicationRecord
  self.primary_key = 'uid'
  has_many :sixhats, foreign_key: 'uid'
end
