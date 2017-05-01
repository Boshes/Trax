/**
 * Game Mixin
 * Controls Game
 */

//- imports
var AdapterMixin = require('../mixins/adapter')
/////////////////////////////////////////////////

//- instantiate
var vue = {
	computed: {
	    'albumsReady':function(){
	        return this.albums.length > 0
	    }
	},
	components: {},
	data: function(){
	  return{
	      genres: ['Alternative Rock','Dubstep','Indie Rock','Industrial','Metal','Pop','Rap','Rock','Ska'],
	      selectedGenre: null,
	      availableTracks: [],
	      artist: {},
	      albums: [],
	      backgroundImage: 'url(./assets/lol.jpg)',
	      isReady: false
	  }  
	},
	key: 'availableTracks',
	mixins: [AdapterMixin],
	route: {},
	methods: {
	    getArtistAlbums: function(genre){
	        this.searchArtistAlbums(genre)
	    },
	    getAlbumTracks: function(albums){
	    	this.searchAllTracks(albums)
	    },
	    answerTrack: function(track){
	    	var popular = Math.max.apply(Math, this.availableTracks.map(function(track){
	    		return track.popularity
	    	}))
	    	console.log(popular)
	    	if(track.popularity === popular){
	    		return this.winRound()
	    	}
	    	else{
	    		return this.loseRound()
	    	}
	    },
	    winRound: function(){
	    	console.log("win")
	    },
	    loseRound: function(){
	    	console.log("lose")
	    }
	}
}
module.exports = vue
/////////////////////////////////////////////////
