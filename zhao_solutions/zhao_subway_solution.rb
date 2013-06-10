require 'pry'
require 'rainbow'

n = ['ts', '34th', '28th-n', '23rd-n', 'us']
l = ['8th', '6th', 'us', '3rd', '1st']
s = ['gc', '33rd', '28th-s', '23rd-s', 'us']

mta = {}

mta[:n] = n
mta[:l] = l
mta[:s] = s

puts `clear`
puts "***MTA***".color('#0033ff')
print "\nWhat train do you want to get on: #{mta.keys.join(', ')}? ".color('#ff3300') #Takes the symbol from the mta keys and puts them. Is the \n to make a new line?
start_train = gets.chomp.to_sym
print "Which stop: #{mta[start_train].join(', ')}? ".color('#ff3300') 
#takes user input that must match n,l or s array at top. Then plugs that into mta hash which will spit out corresponding array output 
stop_a = gets.chomp

print "\nWhat train do you want to get off: #{mta.keys.join(', ')}? ".color('#ff0033')
stop_train = gets.chomp.to_sym
print "Which stop: #{mta[stop_train].join(', ')}? ".color('#ff0033') #same thing as line 19.
stop_b = gets.chomp

intersection = (mta[start_train] & mta[stop_train]).first #Why don't you need the colon(:) b/c each key is a symbol? 
#above is always union square in this example, but it's saying assign intersection to the shared values from start and stop_train

if start_train != stop_train
  stop_a_index = mta[start_train].index(stop_a) #summons the array from start_train, indexes, then takes the index value of stop_a
  stop_a_intersection_index = mta[start_train].index(intersection) #this is union square.
  trip_a_length = (stop_a_index - stop_a_intersection_index).abs

  stop_b_index = mta[stop_train].index(stop_b)
  stop_b_intersection_index = mta[stop_train].index(intersection)
  trip_b_length = (stop_b_index - stop_b_intersection_index).abs # this bit is the second half; from union square to stop_b

  total_length_of_trip = trip_a_length + trip_b_length #the abs was done for both above, so this step is just adding the totals.
else
  stop_a_index = mta[start_train].index(stop_a) #if the trip is on the same line, the math is simple. 
  stop_b_index = mta[stop_train].index(stop_b)
  total_length_of_trip = (stop_a_index - stop_b_index).abs
end

puts "\n\nYour trip length is #{total_length_of_trip} stops.\n\n".color('#ff9900')



