const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');

router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const artists = await Artist.find(searchOptions)
    res.render('artists/index', { 
      artists: artists,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
});

router.get('/new', (req, res) => {
  res.render('artists/new', { artist: new Artist() })
});

router.post('/', async (req, res) => {
  const artist = new Artist({
    name: req.body.name
  })
  try {
    const newArtist = await artist.save();
    // res.redirect(`authors/${newAuthor.id}`);
          res.redirect(`artists`)
  } catch {
    res.render('artists/new', {
        artist: artist,
        errorMessage: "Error creating Artist"
      })
  }
});

module.exports = router;