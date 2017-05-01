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
	        this.backgroundImage = 'url(' + this.artist.images[0].url + ')'
	        this.isReady = true
	    })
	},
	mixins: [],
	methods: {}
}
/////////////////////////////////////////////////

//Get Albums from an Artist
vue.methods.searchArtistAlbums = function(genre){
    return new Promise((resolve, reject) => {
        spotifyApi.searchArtists('genre:"' + genre + '"', {limit:1, offset: Math.floor((Math.random() * 49) + 0), market: 'US'})
            .then(function(data){
                this.artist = data.body.artists.items[0]
                console.log("artist", this.artist)
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
                return spotifyApi.getTracks(tracks)
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
    console.log("albums", albums)
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
//might need more logic
vue.methods.filterAlbums = function(albums){
    var filteredAlbums = albums.filter((album, index, self) =>
        self.findIndex((a) => {
            return album.name.includes(a.name) && album.name.length === a.name.length
        }) === index
    )
    console.log("original albums", albums, "filtered albums", filteredAlbums)
    return filteredAlbums
}

//Return Distinct Tracks
//might make it remove live tracks and other forms of "live" wording
vue.methods.filterTracks = function(tracks){
    var originalTracks = [].concat.apply([], tracks)
    var filteredTracks = originalTracks.filter((track, index, self) => 
        self.findIndex((t) => {
            return track.name.includes(t.name) && track.name.length === t.name.length
        }) === index
    )
    var i = 0
    var availableTracks = []
    while(i <4){
        availableTracks.push(filteredTracks[Math.floor((Math.random() * filteredTracks.length), 0)])
        i++
    }
    console.log("original", originalTracks, "filteredTracks", filteredTracks, "avaibleTracks", availableTracks)
    this.$emit('data ready', availableTracks)
}

//- exports
module.exports = vue
/////////////////////////////////////////////////