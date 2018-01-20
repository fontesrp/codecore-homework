require "./include.rb"
require "./extend.rb"

puts Include.new.titleize("WAR AND PEACE")
# puts Include.titleize("WAR AND PEACE") => NoMethodError

# puts Extend.new.titleize("WAR AND PEACE") => NoMethodError
puts Extend.titleize("WAR AND PEACE")
