const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require('../Models/listing.js');

const MONGO_URI = "mongodb://127.0.0.1:27017/wanderlust";




main()
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONGO_URI);
}




const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
}

initDB();    