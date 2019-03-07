namespace :populate do
  desc "Populate Brands"
  task brands: :environment do
    20.times do
      brand = Brand.create(name: Faker::Company.name, location: Faker::Address.country)
      5.times { Blend.create(name: Faker::Coffee.blend_name, notes: Faker::Coffee.notes, brand_id: brand.id) }
    end
  end
end
