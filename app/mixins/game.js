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
	      successEmojis: ['+1','100','balloon','blush','clap','confetti_ball','dancer','four_leaf_clover','grimacing','grin','grinning','headphones','heart','joy','joy_cat','laughing','microphone','musical_note','notes','ok_hand','raised_fist','raised_hands','relaxed','relieved','slightly_smiling_face','smile','smile_cat','smiley','smiley_cat','smirk','smirk_cat','sparkles','stuck_out_tongue_winking_eye','sunglasses','sunny','sweat_smile','tada','upside_down_face','v','white_check_mark','wink','yum'],
	      failureEmojis: ['-1','angry','anguished','astonished','cold_sweat','confounded','confused','cry','crying_cat_face','disappointed','disappointed_relieved','dizzy_face','expressionless','fearful','frowning','neutral_face','pensive','persevere','scream','scream_cat','slightly_frowning_face','sob','sweat','unamused','weary','white_frowning_face','worried','x'],
	      emoji: null,
	      selectedGenre: null,
	      availableTracks: [],
	      artist: {},
	      albums: [],
	      backgroundImage: 'url(./assets/background.jpg)',
	      timer: null,
	      selectedAnswer: null,
	      correctAnswer: null,
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
	    		var popular = this.getPopularTrack()
		    	if(track.popularity === popular){
		    		this.$Progress.pause()
		    		this.points += 1000 * multiplier
		    		if(this.points > this.highScore){
		    			this.highScore = this.points
		    			localStorage.setItem('trax highscore', this.highScore)
		    		}
		    		return this.winRound()
		    	}
		    	else{
		    		this.$Progress.set(100)
		    		this.$Progress.tempColor('rgb(255,0,0)')
		    		return this.loseRound()
		    	}
	    	}
	    },
	    getPopularTrack:function(){
	    	var popular = Math.max.apply(Math, this.availableTracks.map(function(track){
	    		return track.popularity
		    }))
	    	for(var i = 0; i<this.availableTracks.length;i++){
	    		if(this.availableTracks[i].popularity == popular && $('#button'+i + ' span').text() == this.availableTracks[i].name){
	    			this.correctAnswer = i
	    			break
	    		}
	    	}
	    	return popular
	    },
	    winRound: function(){
	    	this.gameState = true
	    	this.gameFinished = true
	    	this.wins += 1
	    },
	    loseRound: function(){
	    	this.gameState = false
	    	this.gameFinished = true
	    },
	    resetGame: function(){
	    	this.isReady = false
	    	this.isAnswered = false
	    	this.emoji = null
	    	this.points = 0
	    	this.wins = 0
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
	    	this.wins = 0
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
				this.openWindow('success')
				setTimeout(function(){
					this.closeWindow()
				}.bind(this), 2000)
	    	}
	    	else{
	    		this.emoji = 'ap ap-' + this.failureEmojis[Math.floor(Math.random() * this.failureEmojis.length)]
    			this.openWindow('failure')
				setTimeout(function(){
					this.closeWindow()
				}.bind(this), 2000)
	    	}
	    },
	    moreArtist: function(){
	    	var win = window.open('https://www.google.com/search?q=' + this.artist.name, '_blank')
	    	win.focus()
	    }
	}
}
module.exports = vue
/////////////////////////////////////////////////
