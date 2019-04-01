var dotenv = require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var fs = require("fs");

var args = process.argv;
var param1 = args[2];
var param2 = args.slice(3).join(" ");
var logDivider = "   ***************************************************\n";
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

switch(param1){
  case "concert-this":  
    console.log(param1+" "+param2);
    findConcert(param2);
    break;
  case "spotify-this-song":
    console.log(param1+" "+param2);
    searchSpotify(param2);
    break;
  case "movie-this":  
    console.log(param1+" "+param2);
    if(args[3]==null) {
      console.log("param2 is null");
      param2="Mr. Nobody";
    }
    findMovie(param2);
    break;
  case "do-what-it-says":  
    console.log(param1+" "+param2);
    justDoIt();
    break;
  default:  
    console.log(param1+" is not implemented");
    break;
}
function justDoIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    searchSpotify(dataArr[1]);
  });
  
}
function findMovie(movie) {
  console.log(movie);
  axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
    function(response) {
      console.log(response.data);
      var obj = response.data;
      

      var showData = [
        " Title : " + obj.Title,
        " Released Year : "+ obj.Year,
        " Rating : "+ obj.Rated ,
        " Country : "+ obj.Country,
        " Language : "+ obj.Language,
        " Plot : "+ obj.Plot,
        " Actors : "+ obj.Actors,
        "----------------------------------------\n"
     ].join("\n\n");

     console.log(showData);

     fs.appendFile("log.txt", "Logtime: " +moment().format("MM/DD/YYYY hh:mm:ss SSS")+ logDivider+showData, function(err) {
      if (err) throw err;
    });

    }
  );
  
};

function searchSpotify(song) {

  spotify.search({
    type: "track",
    query: song
  }, function(err,data) {
    if(err) {
      return console.log("Error occurred: "+err);
    }
    var spotArtistArr = [];
    // console.log("Songs  ----------------------------------------\n");  
    var tracks = data.tracks.items;
    for (var i=0;i<tracks.length;i++) {
      var obj = data.tracks.items[i];
      // console.log(data.tracks.items[i]);
      // console.log(data.tracks.items);
      var artArr = obj.artists;
      var artNameArr = [];

      for (var j=0;j<artArr.length;j++){
        artNameArr.push(artArr[j].name);
      }
      // var artist = obj.artists[0].name;
      var song = obj.name;
      var previewLink = (obj.preview_url == null) ? " " : obj.preview_url ;
      var album = obj.album.name;
      var showData = [
        " Artist(s) Name: " + artNameArr.join(", "),
        " Song name : "+ song,
        " Spotify preview link : "+ previewLink ,
        " Album name : "+ album,
        "----------------------------------------\n"
     ].join("\n\n");
  
      console.log(showData);
      fs.appendFile("log.txt", "Logtime: " +moment().format("MM/DD/YYYY hh:mm:ss SSS")+ logDivider+showData, function(err) {
        if (err) throw err;
      });
    }
    }
  
  );
};

  function findConcert(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist+ "/events?app_id=codingbootcamp";

    axios.get(URL).then(function(response) {
      
    var jsonData = response.data;
    // console.log(jsonData[0]);
    console.log("Show dates for "+artist+"------------------------\n");

    for(var i=0;i<jsonData.length;i++){
      var showData = [
        // "datetime: "+datetime
        " Venue Name: " + jsonData[i].venue.name.trim(),
        " Venue Location: "+jsonData[i].venue.city.trim(),
        " Show Date: "+moment(jsonData[i].datetime).format("MM/DD/YYYY hh:mm").trim(),
        "------------------------------------------------\n"
     ].join("\n\n");

      console.log(showData);

      fs.appendFile("log.txt", "Logtime: " +moment().format("MM/DD/YYYY hh:mm:ss SSS")+ logDivider+showData, function(err) {
        if (err) throw err;
      });

    }

    });
  };


var Logger = function() {
    this.text = "",
    this.log = function () {
        var str = moment().format("MM/DD/YYYY HH:MM:SS") + " "+this.text;        
        fs.appendFile("log.txt", str, function(err) {

            if (err) {
              console.log(err);
            }
             console.log(str);
          });
    }
}

var logger = new Logger();

