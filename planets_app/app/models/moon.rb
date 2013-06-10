# == Schema Information
#
# Table name: moons
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  diameter   :integer
#  distance   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Moon < ActiveRecord::Base
  attr_accessible :distance, :name, :diameter, :solar_system_id

  belongs_to :solar_system, inverse_of: :moons
  has_and_belongs_to_many :astronauts
  
end
