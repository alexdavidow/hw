require 'pry'
class Animal
  attr_accessor :name, :breed, :age, :gender, :fave_toy, :owner

  def initialize(args = {})
    @name = args[:name]
    @breed = args[:breed]
    @age = args[:age]
    @gender = args[:gender]
    @fave_toy = args[:fave_toy]
    @owner = args[:owner]
  end

  def to_s
    "Name: #{@name} / Breed: #{@breed} / Age: #{@age} / Gender: #{@gender} / Favorite Toy: #{@fave_toy} / Owner: #{@owner.name if @owner}."
  end
end
