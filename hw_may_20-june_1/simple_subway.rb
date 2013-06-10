require 'rainbow'

n = ['ts', '34th', '28th-n', '23rd-n', 'us']
l = ['8th', '6th', 'us', '3rd', '1st']
s = ['gc', '33rd', '28th-s', '23rd-s', 'us']

mta = {}

mta[:n] = n
mta[:l] = l
mta[:s] = s

puts `clear`
puts "Welcome to New York!"
print "\nWhat train line would you like to take? #{mta.keys.join(', ')}: ".color(:yellow)
entry_line = gets.chomp.to_sym
print "\nWhich station? #{mta[entry_line].join(', ')}: ".color(:red)
entry_station = gets.chomp

print "\nWhat train line is your destination? #{mta.keys.join(', ')}: ".color(:yellow)
exit_line = gets.chomp.to_sym
print "\nWhich station? #{mta[exit_line].join(', ')}: ".color(:red)
exit_station = gets.chomp

junction = (mta[entry_line] & mta[exit_line]).first

if entry_line != exit_line
  entry_station_index = mta[entry_line].index(entry_station)
  entry_station_junction = mta[entry_line].index(junction)
  first_leg_length = (entry_station_index - entry_station_junction).abs

  exit_station_index = mta[exit_line].index(exit_station)
  exit_station_junction = mta[exit_line].index(junction)
  second_leg_length = (exit_station_index - exit_station_junction).abs

  total_trip = first_leg_length + second_leg_length

else
  entry_station_index = mta[entry_line].index(entry_station)
  exit_station_index = mta[exit_line].index(exit_station)

  total_trip = (entry_station_index - exit_station_index).abs
end

puts "\nYour trip will be a total of #{total_trip} stops.\n"
