const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./Models/listing');
const path = require('path');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');






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



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));




app.get('/', (req, res) => {
    res.send("Hello, I'm a server");
});




//Index Route 

app.get('/listings', async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});



//New Routes

app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs");

});



//Show Route

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

});



// Create Route

app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});




//Edit Route

app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});


//Update Route

app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    res.redirect(`/listings/${listing._id}`);
});



//Delete Route

app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});









app.listen(3000, () => {
    console.log('Server is running on port 3000');
});