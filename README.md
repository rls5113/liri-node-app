# liri-node-app
LIRI (Language Interpretation and Recognition Interface)
This command line interface (CLI) will take in specific actions and return limited results.

Setup -  checkout the code by cloning the repository at https://github.com/rls5113/liri-node-app.git.
 
After cloning the repository, create a file named ".env" in project directory along with liri.js.  Inside this file, put these values for spotify.  SPOTIFY_ID=<your-spotify-id-number> and SPOTIFY_SECRET=<your-spotify-secret>.

This command line program requires that node.js and npm be installed.  Refer to documentation for installation instructions.

Once node and npm install is completed, run npm install to install packages required by LIRI.

1. LIRI responds to the following commands:

   * `concert-this` followed by the band name for which you want to see when and where they play next

   * `spotify-this-song` followed by the name of a song title.

   * `movie-this` followed by the name of a movie to view basic information about you favorite movie.  If you cant decide, running this command with no parameters returns information about the movie, "Mr. Nobody".

   * `do-what-it-says` followed by anything will return information about the song, "I Want it That Way"