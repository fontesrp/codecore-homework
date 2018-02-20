# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all

100.times do
  Post.create title: "#{Faker::Simpsons.quote}-#{(1..1000).to_a.sample}", body: Faker::Seinfeld.quote.ljust(50, "1234")
end

puts "Created #{Post.count} new posts"
