class Astronaut < ActiveRecord::Base
  attr_accessible :img_url, :name, :trips_to_space, :moon_ids

  has_and_belongs_to_many :moons
  has_many :solar_systems, through: :moons
end
