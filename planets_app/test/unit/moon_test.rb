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

require 'test_helper'

class MoonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
