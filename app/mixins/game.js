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
	      genres: ['Alternative Rock','Blues','Classical','Country','Dance','Drum and Bass','Dubstep','EDM','Emo','Folk','Funk','Indie Rock','Industrial','Jazz','Metal','New Age','New Wave','Pop','Punk','Rap','Reggae','Rock','Ska','Soul'],
	      selectedGenre: null,
	      availableTracks: [],
	      artist: {},
	      albums: [],
	      backgroundImage: 'url(./assets/lol.jpg)',
	      timer: null,
	      isAnswered: false,
	      isCorrect: {},
	      isWrong: {},
	      points: null,
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
	    	if(this.isAnswered==false){
	    		this.isAnswered = true
	    		clearInterval(this.timer)
	    		var multiplier = this.$Progress.get()
		    	var popular = Math.max.apply(Math, this.availableTracks.map(function(track){
		    		return track.popularity
		    	}))
		    	console.log(popular)
		    	if(track.popularity === popular){
		    		this.$Progress.pause()
		    		this.points += 1000 * multiplier
		    		console.log("points", this.points)
		    		return this.winRound()
		    	}
		    	else{
		    		this.$Progress.set(100)
		    		this.$Progress.tempColor('rgb(255,0,0)')
		    		return this.loseRound()
		    	}
	    	}
	    },
	    winRound: function(){
	    	console.log("win")
	    },
	    loseRound: function(){
	    	console.log("lose")
	    },
	    clearBar: function(){
	    	clearInterval(this.timer)
	    	this.timer = null
	    }
	}
}
module.exports = vue
/////////////////////////////////////////////////
