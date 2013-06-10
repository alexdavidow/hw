class CreateMoons < ActiveRecord::Migration
  def change
    create_table :moons do |t|
      t.string :name
      t.integer :diameter
      t.integer :distance

      t.belongs_to :solar_system

      t.timestamps
    end
  end
end
