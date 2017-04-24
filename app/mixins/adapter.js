/**
* Adapter Mixin
*
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
	        this.$set(this.$options.key, data)
	        this.isReady = true
	    })
	},
	mixins: [],
	methods: {}
}
/////////////////////////////////////////////////
vue.methods.searchArtistAlbums = function(genre){
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
            console.log("albums", data.body.albums)
            this.albums = this.filterAlbums(data.body.albums)
        }.bind(this))
        .catch((err) => {
            console.log(err)
        })
}

vue.methods.searchAlbumTracks = function(album){
    spotifyApi.getAlbum(album.id)
        .then(function(data){
            return data.body.tracks.items.map(function(t){ return t.id})
        })
        .then(function(tracks){
            return spotifyApi.getTracks(tracks)
        })
        .then(function(data){
            console.log(data.body.tracks)
            return data.body.tracks
        }.bind(this))
        .catch((err) => {
            console.log(err)
        })
}

vue.methods.searchAllTracks = function(){
    // Promise.all
}

vue.methods.filterAlbums = function(albums){
    var filteredAlbums = []
    console.log("albums to filter", albums)
    //TODO
    // return filteredAlbums
    return albums
}

vue.methods.filterTracks = function(){
    var filteredTracks = []
    console.log("tracks to filter", this.tracks)
    //TODO
    // this.$emit('data ready', filteredTracks)
    this.$emit('data ready', this.tracks)
}

//- exports
module.exports = vue
/////////////////////////////////////////////////