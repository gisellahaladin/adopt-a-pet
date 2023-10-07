const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
// import './app.css';

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const petList = require('./petList');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
    const { pet_type, pet_id } = req.params;

    const petTypes = petList[pet_type];

    if (petTypes) {
        const pet = petTypes[pet_id];

        if (pet) 
        res.render ( 'petProfile', { pet });
    } 
    else {
        res.status(404).send('Pet Type not Found');
    }
  });

app.get('/animals/:pet_type', (req, res) => {
    const { pet_type } = req.params;

    const petTypes = petList[pet_type];

    if (petTypes) {
        res.render('petsList', { pet_type, pets: petTypes});
    }
    else {
        res.status(404).send('Pet Type not Found');
    }
});

app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`)
});