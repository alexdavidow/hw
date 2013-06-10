require 'pry'

class Client
  attr_accessor :name, :age, :gender, :no_kids, :pets

  def initialize(args = {})
    @name = args[:name]
    @age = args[:age]
    @gender = args[:gender]
    @no_kids = args[:no_kids]
    @pets = args[:pets]
    @pets ||= []
  end

  def to_s
    "Name: #{@name} / Age: #{@age} / Gender: #{@gender} / Kids: #{@no_kids} / Pets: #{@pets}."
  end
end
