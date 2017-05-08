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
	      genres: ['Alternative Rock','Blues','Classical','Country','Dancehall', 'Drum and Bass','Dubstep','EDM','Electro Swing', 'Emo','Folk','Funk','Grunge','Indie Rock','Industrial','Jazz','Metal','Metalcore','New Age','New Wave','Pop','Progressive Metal','Punk','R&B','Rap','Reggae','Rock','Ska','Soul','Trap Music'],
	      successEmojis: ['clap','grimacing','heart', 'raised_fist','musical_note','notes','ok_hand','raised_hands','slightly_smiling_face','smile','smile_cat','smiley','smiley_cat','smirk_cat','stuck_out_tongue_winking_eye','sunny','upside_down_face','wink'],
	      failureEmojis: ['angry','anguised','cry','crying_cat_face','disappointed','dizzy_face','frowning','scream','scream_cat','slightly_frowning_face','sob','worried'],
	      emoji: null,
	      selectedGenre: null,
	      availableTracks: [],
	      artist: {},
	      albums: [],
	      backgroundImage: 'url(./assets/background.jpg)',
	      timer: null,
	      selectedAnswer: null,
	      isAnswered: false,
	      isCorrect: {},
	      isWrong: {},
	      gameState: null,
	      gameFinished: false,
	      points: 0,
	      highScore: 0,
	      wins: 0,
	      backgroundReady: false,
	      condition: null,
	      showInterludeWindow: false,
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
	    answerTrack: function(track, id){
	    	if(this.isAnswered==false){
	    		this.isAnswered = true
	    		this.selectedAnswer = id
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
		    		return this.loseRound()
		    	}
	    	}
	    },
	    winRound: function(){
	    	console.log("win")
	    	this.gameState = true
	    	this.gameFinished = true
	    	this.wins += 1
	    },
	    loseRound: function(){
	    	console.log("lose")
	    	this.gameState = false
	    	this.gameFinished = true
	    },
	    resetGame: function(){
	    	this.isReady = false
	    	this.isAnswered = false
	    	this.emoji = null
	    	this.points = 0
	    	this.backgroundReady = false
	    	eventHub.$emit('reset game')
	    },
	    retryGame: function(){
	    	this.isAnswered = false
	    	this.isReady = false
	    	this.albumsReady = false
	    	this.gameFinished = false
	    	this.emoji = null
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
	    	this.emoji = null
			this.availableTracks = []
	    	this.artist = {}
	    	this.albums = []
	    	this.getArtistAlbums(this.genre)
	    },
	    clearBar: function(){
	    	clearInterval(this.timer)
	    	this.timer = null
	    },
	    setInterludeWindow: function(gameState){
	    	if(gameState==true){
	    		this.emoji = 'ap ap-' + this.successEmojis[Math.floor(Math.random() * this.successEmojis.length)]
	    		console.log(this.emoji)
				this.openWindow('success')
				setTimeout(function(){
					this.closeWindow()
				}.bind(this), 2000)
	    	}
	    	else{
	    		this.emoji = 'ap ap-' + this.failureEmojis[Math.floor(Math.random() * this.failureEmojis.length)]
	    		console.log(this.emoji)
    			this.openWindow('failure')
				setTimeout(function(){
					this.closeWindow()
				}.bind(this), 2000)
	    	}
	    }
	}
}
module.exports = vue
/////////////////////////////////////////////////
