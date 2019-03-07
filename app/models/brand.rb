class Brand < ApplicationRecord
  validates_presence_of :name
  has_many :blends, dependent: :destroy
end
