/**
 * Game Mixin
 * Controls Game
 */

//- imports
var AdapterMixin = require('../mixins/adapter')
import { eventHub } from '../event.js'
/////////////////////////////////////////////////

//- instantiate
var vue = {
	computed: {
	    'albumsReady':function(){
	        return this.albums.length > 0
	    }
	},
	components: {
		
	},
	data: function(){
	  return{
	      genres: ['Alternative Rock','Blues','Classical','Country','Drum and Bass','Dubstep','EDM','Emo','Folk','Funk','Grunge','Indie Rock','Industrial','Jazz','Metal','Metalcore','New Age','New Wave','Pop','Punk','Rap','Reggae','Rock','Ska','Soul'],
	      selectedGenre: null,
	      availableTracks: [],
	      artist: {},
	      albums: [],
	      backgroundImage: 'url(./assets/background.jpg)',
	      timer: null,
	      isAnswered: false,
	      isCorrect: {},
	      isWrong: {},
	      gameState: null,
	      gameFinished: false,
	      points: 0,
	      highScore: 0,
	      wins: 0,
	      isReady: false
	  }  
	},
	key: 'availableTracks',
	mixins: [AdapterMixin],
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
	    		this.clearBar(this.timer)
	    		var multiplier = this.$Progress.get()
		    	var popular = Math.max.apply(Math, this.availableTracks.map(function(track){
		    		return track.popularity
		    	}))
		    	console.log(popular)
		    	if(track.popularity === popular){
		    		this.$Progress.pause()
		    		this.points += 1000 * multiplier
		    		if(this.points > this.highScore){
		    			this.highScore = this.points
		    			localStorage.setItem('trax highscore', this.highScore)
		    		}
		    		console.log("points", this.points, "highscore", this.highScore)
		    		return this.winRound()
		    	}
		    	else{
		    		this.$Progress.set(100)
		    		this.$Progress.tempColor('rgb(255,0,0)')
		    		this.gameFinished = true
		    		return this.loseRound()
		    	}
	    	}
	    },
	    winRound: function(){
	    	console.log("win")
	    	this.gameFinished = true
	    	this.gameState = true
	    	this.wins += 1
	    },
	    loseRound: function(){
	    	console.log("lose")
	    	this.gameFinished = true
	    	this.gameState = false
	    },
	    resetGame: function(){
	    	this.isReady = false
	    	this.isAnswered = false
	    	this.points = 0
	    	eventHub.$emit('reset game')
	    },
	    retryGame: function(){
	    	this.isAnswered = false
	    	this.isReady = false
	    	this.albumsReady = false
	    	this.gameFinished = false
	    	this.availableTracks = []
	    	this.artist = {}
	    	this.albums = []
	    	this.points = 0
	    	this.getArtistAlbums(this.genre)
	    },
	    continueGame: function(){
	    	this.isAnswered = false
	    	this.isReady = false
	    	this.albumsReady = false
	    	this.gameFinished = false
			this.availableTracks = []
	    	this.artist = {}
	    	this.albums = []
	    	this.getArtistAlbums(this.genre)
	    },
	    clearBar: function(){
	    	clearInterval(this.timer)
	    	this.timer = null
	    }
	}
}
module.exports = vue
/////////////////////////////////////////////////
