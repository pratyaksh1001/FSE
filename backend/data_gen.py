import json
import random

# ---------------- STATIONS / CITIES ----------------
stations = [
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

stations = list(set(stations))

# ---------------- HELPERS ----------------


def generate_time():
    h = random.randint(0, 23)
    m = random.randint(0, 59)
    return f"{h:02d}:{m:02d}"


def add_minutes(time_str, mins):
    h, m = map(int, time_str.split(":"))
    total = h * 60 + m + mins
    return f"{(total // 60) % 24:02d}:{total % 60:02d}"


# ---------------- TRAIN GENERATION ----------------


def generate_train(i):
    route_length = random.randint(5, 20)
    route = random.sample(stations, route_length)

    current_time = generate_time()
    distance = 0
    station_data = []

    for idx, st in enumerate(route):
        if idx != 0:
            delta = random.randint(50, 300)
            distance += delta
            current_time = add_minutes(current_time, random.randint(30, 120))

        station_data.append(
            {"station": st, "arrival": current_time, "distance": distance}
        )

    return {
        "train_number": 10000 + i,
        "train_name": f"Express_{i}",
        "from": route[0],
        "to": route[-1],
        "stations": station_data,
    }


# ---------------- FLIGHT GENERATION ----------------


def generate_flight(i):
    src, dest = random.sample(stations, 2)

    # realistic flight distance
    distance = random.randint(200, 2500)

    departure = generate_time()

    # flights are faster → 500-800 km/h approx
    duration_minutes = int(distance / random.randint(500, 800) * 60)
    arrival = add_minutes(departure, duration_minutes)

    # cost roughly proportional to distance
    cost = int(distance * random.uniform(4, 10))

    return {
        "flight_number": f"FL{i + 1000}",
        "from": src,
        "to": dest,
        "distance": distance,
        "departure": departure,
        "arrival": arrival,
        "cost": cost,
    }


# ---------------- MAIN ----------------

trains = [generate_train(i) for i in range(1000)]
flights = [generate_flight(i) for i in range(1000)]

data = {"trains": trains, "flights": flights}

with open("transport.json", "w") as f:
    json.dump(data, f, indent=2)

print("Generated transport.json with trains + flights 🚀")
