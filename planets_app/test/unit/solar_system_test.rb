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

require 'test_helper'

class SolarSystemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
