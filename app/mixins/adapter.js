/**
* Adapter Mixin
* Handles API requests and sets data
*/

//- imports
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi()
var Promise = require('es6-promise').Promise
/////////////////////////////////////////////////

//- instantiate
var vue = {
	components: {},
	created: function(){
	    this.$on('data ready', function(data){
	        this.$set(this, this.$options.key, data)
	        this.backgroundReady = false
	        this.backgroundImage = 'url(' + this.artist.images[0].url + ')'
	        this.isReady = true
	    })
	},
	mixins: [],
	methods: {
	    'getClientFlowToken':function(){
	        return new Promise(function(resolve, reject){
	            var self = this
    	        $.ajax({
    	            type: "GET",
    	           // url:'https://boshes.github.io/Trax/config.php'
    	           // url:"https://trax-boshes.c9users.io/config.php",
    	            url: "http://localhost/trax/config.php",
    	            success:function(data){
    	                spotifyApi.setAccessToken(JSON.parse(data).access_token)
    	                self.isTokenReady = true
    	                resolve(self.isTokenReady)
    	            },
    	            error:function(err){
    	                reject(err)
    	            }
    	        })
	        }.bind(this))
	    }
	}
}
/////////////////////////////////////////////////

//Get Albums from an Artist
vue.methods.searchArtistAlbums = function(genre){
    return new Promise((resolve, reject) => {
        spotifyApi.searchArtists('genre:"' + genre + '"', {limit:1, offset: Math.floor((Math.random() * 49) + 0), market: 'US'})
            .then(function(data){
                this.artist = data.body.artists.items[0]
                return spotifyApi.getArtistAlbums(this.artist.id)
            }.bind(this))
            .then(function(data){
                return data.body.items.map(function(a){ return a.id})
            })
            .then(function(albums){
                return spotifyApi.getAlbums(albums, {market: 'US'})
            })
            .then(function(data){
                this.albums = this.filterAlbums(data.body.albums)
                resolve(this.albums)
            }.bind(this))
            .catch((err) => {
                reject(err)
            })
    })
}

//Get Tracks for an Album
vue.methods.searchAlbumTracks = function(album){
    return new Promise((resolve, reject) =>{
        spotifyApi.getAlbum(album.id, {market: 'US'})
            .then(function(data){
                return data.body.tracks.items.map(function(t){ return t.id})
            })
            .then(function(tracks){
                return spotifyApi.getTracks(tracks, {market: 'US'})
            })
            .then(function(data){
                resolve(data.body.tracks)
            }.bind(this))
            .catch((err) => {
                reject(err)
            })
            
    })
}

//Get Tracks from all the Albums
vue.methods.searchAllTracks = function(albums){
    var albumPromises = albums.map(this.searchAlbumTracks)
    Promise.all(albumPromises)
        .then(function(data){
            this.filterTracks(data)
        }.bind(this))
        .catch((err) => {
            console.log(err)
        })
}

//Return Distinct Albums
vue.methods.filterAlbums = function(albums){
    var filteredAlbums = albums.filter((album, index, self) =>
        self.findIndex((a) => {
            return album.name.includes(a.name) && album.name.length === a.name.length
        }) === index
    )
    return filteredAlbums
}

//Return Distinct Tracks
vue.methods.filterTracks = function(tracks){
    var originalTracks = [].concat.apply([], tracks)
    var filteredTracks = originalTracks.filter((track, index, self) => 
        self.findIndex((t) => {
            return track.name.includes(t.name) && track.name.length === t.name.length
        }) === index
    )
    var i = 0
    var availableTracks = []
    var trackNames = []
    var numbers = []
    while(i <4){
        var number = Math.floor((Math.random() * filteredTracks.length), 0)
        if(numbers.indexOf(number) === -1){
            numbers.push(number)
            if(trackNames.indexOf(filteredTracks[number].name) === -1){
                trackNames.push(filteredTracks[number].name)
                availableTracks.push(filteredTracks[number])
                i++
            }
        }
    }
    this.$emit('data ready', availableTracks)
}

//- exports
module.exports = vue
/////////////////////////////////////////////////