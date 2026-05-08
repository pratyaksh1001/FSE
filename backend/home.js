import { client } from "./db.js";
import { Router } from "express";
import { SearchQuery } from "./schema.js";
import client from "./db.js";
import cache from "./cache.js";

const homeRouter = Router();

const stations = [
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
];

homeRouter.get("/data", async (req, res) => {
    res.send({ cities: stations });
});

homeRouter.post("/", async (req, res) => {
    console.log(req.body);
});

homeRouter.post("/submit", async (req, res) => {
    const { from, to, startDate, endDate, token } = req.body;
    const user = cache[token];
    if (!user) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
    const dbuser=client.db("fse").collection("users").findOne({ email: JSON.parse(user).email });
    const query=SearchQuery.parse({ from, to, startDate, endDate, userId: (dbuser)._id });
    client.db("fse").collection("searchqueries").insertOne(query);
    
});

export default homeRouter;