class CreateAstronauts < ActiveRecord::Migration
  def change
    create_table :astronauts do |t|
      t.string :name
      t.integer :trips_to_space
      t.text :img_url

      t.timestamps
    end
  end
end
