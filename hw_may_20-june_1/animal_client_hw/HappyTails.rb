require 'pry'
require 'rainbow'

require_relative "Client"
require_relative "Animal"

alex = Client.new({
  :name => "Alex",
  :age => 26,
  :gender => "male",
  :no_kids => 0,
  :pets => []
})

bob = Client.new({
  :name => "Bob",
  :age => 30,
  :gender => "male",
  :no_kids => 3,
  :pets => []
})

debra = Client.new({
  :name => "Debra",
  :age =>  60,
  :gender => "female",
  :no_kids => 2,
  :pets =>  []
})

bonzo = Animal.new({
  :name => "Bonzo",
  :breed => "labradoodle", 
  :age =>  2,
  :gender => "male",
  :fave_toy => "bear",
  :owner => nil
})
emma = Animal.new({
  :name => "Emma",
  :breed => "Shihtzu",
  :age => 15,
  :gender => "female",
  :fave_toy => "mean_kitty",
  :owner => nil
})
jinx = Animal.new({
  :name => "Jinx",
  :breed => "Chau_Chau",
  :age =>  "4",
  :gender => "male",
  :fave_toy => "cupcake",
  :owner => nil
})



alex.pets << bonzo
debra.pets << emma

emma.owner = debra
bonzo.owner = alex

puts "This should be pet details.".color(:yellow)
puts alex.pets

puts debra.pets
puts jinx

puts "This should be owner details".color(:yellow)
puts bonzo.owner
puts emma.owner
puts bob


