# == Schema Information
#
# Table name: solar_systems
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  diameter   :string(255)
#  image_url  :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class SolarSystem < ActiveRecord::Base
  attr_accessible :diameter, :image_url, :name, :moon_ids

  has_many :moons, inverse_of: :solar_system
  has_many :astronauts, through: :moons
end
