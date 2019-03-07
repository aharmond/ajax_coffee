class CreateBlends < ActiveRecord::Migration[5.2]
  def change
    create_table :blends do |t|
      t.string :name
      t.string :notes
      t.belongs_to :brand, foreign_key: true

      t.timestamps
    end
  end
end
