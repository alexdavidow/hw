class CreateSolarSystems < ActiveRecord::Migration
  def change
    create_table :solar_systems do |t|
      t.string :name
      t.string :diameter
      t.text :image_url

      t.timestamps
    end
  end
end
