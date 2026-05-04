import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
    "mongodb+srv://pratyakshkarmahe:Pratyaksh_102080@pratyaksh.zlulwny.mongodb.net/?appName=pratyaksh";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export { client };
