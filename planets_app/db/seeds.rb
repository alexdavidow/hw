SolarSystem.delete_all
Moon.delete_all
Astronaut.delete_all

p1 = SolarSystem.create(name: "Mercury", diameter: 4879, image_url: "http://solarsystem.nasa.gov/images/Mercury.jpg")
p2 = SolarSystem.create(name: "Venus", diameter: 12104, image_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCdNSADWX9Z0GOoSS-5RDS4G9gF-Mxsu_XeBDc6nKd_WRJeNuK")
p3 = SolarSystem.create(name: "Earth", diameter: 12756, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQroswHysZ52gQPkDotxW01JRgK-WxqzD5KRVrbToM0NyNJ_fbRDjYuNg")
p4 = SolarSystem.create(name: "Mars", diameter: 6792, image_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdGlc5tdyN2yefHlWKVBDvkptTNv_903bPHDwLOMKqTNgeWwifKg")
p5 = SolarSystem.create(name: "Jupiter", diameter: 142984, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk7G_b-0QZd-68KAfNTaCLpF4gXILkuNFy_E_PZBa1bB0CvpSOwbpOuSM")
p6 = SolarSystem.create(name: "Saturn", diameter: 120536, image_url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS38g3IF8_OKdSnHvJ-xI42RUjYwIeyzhVL8bsVsQ382m2Sn6TkGg")
p7 = SolarSystem.create(name: "Uranus", diameter: 51118, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lEMqdES78UyhAqwL5eD8U8TjtUePCmD2g4jjisboL6bOjA8KgA")
p8 = SolarSystem.create(name: "Neptune", diameter: 49528, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV13FN6rvSPSRS2sazbclchdqBTns7NpZzNClkuUd9eFHgpWR-xE2sTaM")

moon_saturn = Moon.new(name: "Titan", distance: 1221850, diameter: 5150)
moon_earth = Moon.new(name: "Luna", distance: 384400, diameter: 3474)
moon_mars = Moon.new(name: "Phobos", distance: 9380, diameter: 2741)
moon_jupiter = Moon.new(name: "Europa", distance: 670900, diameter: 3138)
moon_jupiter2 = Moon.new(name: "Thebe", distance: 221895, diameter: 4950)
moon_saturn2 = Moon.new(name: "Dione", distance: 377400, diameter: 1120)
moon_uranus = Moon.new(name: "Ariel", distance: 191240, diameter: 1157)
moon_neptune = Moon.new(name: "Proteus", distance: 117600, diameter: 400)

a1 = Astronaut.new(name: "Alex Davidow", trips_to_space: 3, img_url: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c44.45.551.551/s160x160/319213_10100278077392526_1983704948_n.jpg")
a2 = Astronaut.new(name: "Isabel Cortes", trips_to_space: 2, img_url: "https://profile-b.xx.fbcdn.net/hprofile-ash4/c1.62.391.391/s160x160/390390_2300859173923_114997117_n.jpg")
a3 = Astronaut.new(name: "Mike Dexter", trips_to_space: 5, img_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRF3w7HpArf4WtWk5x0sc2uLQgQhevwrMNwFUJibhpxGWsSQ3vaVA")
a4 = Astronaut.new(name: "Neil Armstrong", trips_to_space: 2, img_url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRoWaIxHcev_jMtJSDlyy3CUcY9EIzk48ewHfc7_OVkhbonvygB")



p3.moons << moon_earth
p4.moons << moon_mars
p5.moons << moon_jupiter << moon_jupiter2 
p6.moons << moon_saturn << moon_saturn2 
p7.moons << moon_uranus
p8.moons << moon_neptune

moon_earth.astronauts << a4
moon_saturn.astronauts << a2
moon_uranus.astronauts << a1
moon_jupiter.astronauts << a3
moon_jupiter2.astronauts << a3
moon_mars.astronauts << a1


