class CreateAstronautsMoonsTable < ActiveRecord::Migration
	def change
		create_table :astronauts_moons, id: false do |t|
			t.belongs_to :astronaut
			t.belongs_to :moon
		end
	end
end
