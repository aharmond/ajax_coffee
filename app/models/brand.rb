class Brand < ApplicationRecord
  has_many :blends, dependent: :destroy
end
