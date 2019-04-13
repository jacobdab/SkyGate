const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const countriesJSON =('https://api.openaq.org/v1/countries');
const countryList = [];


router.get('/', (req, res, next)=> {

  res.render('index');
});

router.post('/',(req,res)=>{
  let country = req.body.name;
  let counterEach = 0;
  let code;
  let content = [];
  let keys = [];
  fetch(countriesJSON)
      .then(countryRes => countryRes.json())
      .then(countryRes=>{
        countryRes.results.forEach((countryE)=> {
          countryList.push(countryE.name);
      if (countryE.name === country) {
        code = countryE.code
      }})
        return code;
      }).then(code=>{
    citiesJSON =('https://api.openaq.org/v1/cities?limit=10&order_by=count&sort=desc&country='+code);
   return fetch(citiesJSON).then(citiesResp => citiesResp.json())
       .then(async citiesResp => {
           for (let i = 0; i < citiesResp.results.length; i++) {
               await fetch(encodeURI('https://'+code+'.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=' + citiesResp.results[i].city))
                   .then(desc => desc.json())
                   .then(wiki => {
                       keys = Object.keys(wiki.query.pages);
                       content.push(wiki.query.pages[keys].extract);
                       counterEach++;
                       if (counterEach == citiesResp.results.length) {
                           res.render('index', {resp: citiesResp.results, content, country, countryList});
                       }
                   })
           }
       })
  });
});


module.exports = router;
