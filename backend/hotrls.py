import json
import random

cities = [
    "New Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Kanpur",
    "Lucknow",
    "Patna",
    "Gorakhpur",
    "Bhubaneswar",
    "Ranchi",
    "Jammu",
    "Amritsar",
    "Chandigarh",
    "Jaipur",
    "Udaipur",
    "Kota",
    "Bhopal",
    "Nagpur",
    "Itarsi",
    "Visakhapatnam",
    "Vizianagaram",
    "Tirupati",
    "Kacheguda",
    "Guntakal",
    "Secunderabad",
    "Delhi (Nizamuddin)",
    "Anand Vihar",
    "Varanasi",
    "Prayagraj",
    "Gaya",
    "Danapur",
    "Darbhanga",
    "Saharanpur",
    "Moradabad",
    "Bareilly",
    "Faridabad",
    "Agra",
    "Mathura",
    "Ratlam",
    "Surat",
    "Vadodara",
    "Solapur",
    "Kolhapur",
    "Madgaon (Goa)",
    "Ernakulam",
    "Thiruvananthapuram",
    "Kozhikode",
    "Kannur",
    "Madurai",
    "Coimbatore",
    "Salem",
    "Jolarpettai",
    "Delhi",
    "Guwahati",
    "New Jalpaiguri",
    "Siliguri",
    "Raxaul",
    "Samastipur",
    "Sonpur",
    "Muzaffarpur",
    "Jamalpur",
    "Kiul",
    "Bardhaman",
    "Asansol",
    "Durgapur",
    "Kharagpur",
    "Shalimar",
    "Jamshedpur",
    "Chakradharpur",
    "Rourkela",
    "Jharsuguda",
    "Sambalpur",
    "Brahmapur",
    "Cuttack",
    "Angul",
    "Talcher",
    "Jajpur",
    "Bilaspur",
    "Raigarh",
    "Durg",
    "Rajnandgaon",
    "Gondia",
    "Anakapalle",
    "Warangal",
    "Kazipet",
    "Malkajgiri",
    "Katpadi",
    "Arakkonam",
    "Tiruvallur",
    "Chengalpattu",
    "Chennai Egmore",
    "Tambaram",
    "Ajmer",
    "Pali",
    "Jaisalmer",
    "Bikaner",
    "Hisar",
    "Bathinda",
    "Firozpur",
    "Ludhiana",
    "Ambala",
    "Kalka",
]

cities = list(set(cities))

# ---- HOTEL NAME PARTS ----
prefixes = ["Grand", "Royal", "Comfort", "Elite", "Heritage", "Budget", "Prime"]
suffixes = ["Inn", "Residency", "Palace", "Suites", "Stay", "Lodge", "Hotel"]


def generate_hotel(city):
    return {
        "name": f"{random.choice(prefixes)} {city.split()[0]} {random.choice(suffixes)}",
        "price": random.randint(1200, 8000),  # INR
        "rating": round(random.uniform(3.5, 4.8), 1),  # realistic
        "distance_from_station": round(random.uniform(0.5, 6.0), 1),  # km
    }


data = {}

for city in cities:
    num_hotels = random.randint(2, 5)
    hotels = [generate_hotel(city) for _ in range(num_hotels)]

    data[city] = {"hotels": hotels}
with open("hotels.json", "w") as f:
    json.dump(data, f, indent=2)
