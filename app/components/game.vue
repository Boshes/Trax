<script>
import { eventHub } from '../event.js'
var GameMixin = require('../mixins/game')
import IOdometer from 'vue-odometer'

export default {
	name: 'Game',
	components: {
		IOdometer,
		interlude: require('./interlude.vue')
	},
	mixins: [GameMixin],
	data: function () {
		return {
			
		}
	},
	computed: {
	},
	created: function () {
	    this.getArtistAlbums(this.genre)
	    this.highScore = parseInt(localStorage.getItem('trax highscore'))
	    if(isNaN(this.highScore)){
	    	this.highScore = 0
	    }
	},
	methods: {
	    'choose':function(track){
	    	if(track!=null){
	    		console.log(track)
	    	}
	    },
	    'openWindow': function(condition){
	    	this.condition = condition
	    	this.showInterludeWindow = true
	    },
	    'closeWindow': function(){
	    	this.condition = null
	    	this.showInterludeWindow = false
	    }
	},
	props: {
		'genre':{
			type: String,
			required: true
		},
		'body': {
			required: true
		},
		'back': {
			required: true
		},
		'title': {
			required: true	
		},
		'ready':{
			type: Boolean,
			required: true
		}
	},
	watch: {
		'albumsReady':function(){
			if(this.albumsReady == true){
				this.getAlbumTracks(this.albums)
			}
		},
		'backgroundImage': function(){
			eventHub.$emit('background', this.backgroundImage)
		},
		'isReady':function(){
			if(this.isReady == true){
				if(this.trackSound!=null){
					this.resetSound()
				}
				for(var i=0;i<4;i++){
					if(this.availableTracks[i].is_playable==false){
						$('#volume'+i).css('color', 'rgb(237,237,237)')
					}
					else{
						$('#volume'+i).css('color', this.body)
					}
				}
				this.detectKeys()
				this.$Progress.tempColor('rgb(50,205,50)')
				this.$Progress.set(100)
				this.timer = setInterval(function(){
					this.$Progress.decrease(10)
					if(this.$Progress.get()==80){
						this.$Progress.tempColor('rgb(124,252,0)')
					}
					if(this.$Progress.get()==60){
						this.$Progress.tempColor('rgb(255,255,0)')
					}
					if(this.$Progress.get()==40){
						this.$Progress.tempColor('rgb(255,194,0)')	
					}
					if(this.$Progress.get()==20){
						this.$Progress.tempColor('rgb(255,165,0)')
					}
					if(this.$Progress.get()==10){
						this.$Progress.tempColor('rgb(255,0,0)')
					}
					if(this.$Progress.get()==0){
						this.isAnswered = true
						this.selectedAnswer = null
						this.correctAnswer = null
						this.getPopularTrack()
						this.clearBar()
						this.$Progress.set(100)
						this.loseRound()
					}
				}.bind(this),1000)
				eventHub.$emit('timer', this.timer)
			}
		},
		'gameFinished': function(){
			if(this.gameFinished==true){
				if(this.gameState==true){
					this.setInterludeWindow(this.gameState)
					for(var i=0; i<4;i++){
						if(i==this.selectedAnswer){
							$('#button'+this.selectedAnswer).css('border', '3px solid rgb(100,218,70)')
						}
						else{
							$('#button'+i).fadeTo('fast',0)
						}
					}
				}
				else{
					this.setInterludeWindow(this.gameState)
					for(var i=0; i<4;i++){
						if(i==this.selectedAnswer){
							$('#button'+this.selectedAnswer).css('border', '3px solid rgb(255,99,71)')
						}
						else if(i==this.correctAnswer){
							if(this.selectedAnswer!=null){
								$('#button'+this.correctAnswer).css('border', '3px solid rgb(100,218,70)')
							}
							else{
								$('#button'+this.correctAnswer).css('border', '3px solid rgb(255,194,0)')
							}
						}
						else{
							$('#button'+i).fadeTo('fast', 0)
						}
					}
				}
			}
		}
	}
}
</script>

<template lang="jade">
#game
	.container-fluid
		md-spinner.center-block.spinnerShade(md-indeterminate, v-show='!isReady || !ready', :style='{color: title}')
		br
		div.text-center
			transition(name='slide-fade')
				span.md-display-3(style='word-wrap: break-word;', v-if='isReady && ready', v-text='artist.name', :style='{color: title}')
			transition(name='slide-fade')
				md-speed-dial.md-fab-top-right(v-if='isReady && ready', md-open="hover", md-theme='light-blue', md-direction="left", :style='{color: title}')
					md-button.md-fab(md-fab-trigger)
						md-icon(md-icon-morph) more_vert
						md-icon more_horiz
					md-button.md-fab-md-primary.md-mini-md-clean
						md-icon videogame_asset
							md-tooltip(md-direction="bottom") Click or use arrow keys to choose!
					md-button.md-fab-md-primary.md-mini-md-clean
						md-icon(v-on:click.native='moreArtist') search
							md-tooltip(md-direction="bottom") Look Up Artist
			br
			br
			.col-sm-12.no-padding
				.col-xs-6.pull-left.no-padding
					span.md-display-1(:style='{color: title}') Points
					br
					i-odometer(:value='points', :style='{color: body}')
				.col-xs-6.pull-right.no-padding
					span.md-display-1(:style='{color: title}') High Score
					br
					i-odometer(:value='highScore', :style='{color: body}')
			br
			br
			transition(name='slide-fade')
				div(v-if='isReady && ready', style='padding-top:20px;')
					.col-sm-12.center-block.no-padding
						md-button.md-raised.dynamicButton.answerButton#button0(v-on:click.once.native.self='answerTrack(0)', :style='{color: body, backgroundColor: back}')
							img.image(:src='availableTracks[0].album.images[2].url', v-on:click.once='answerTrack(0)')
							span(v-text='availableTracks[0].name', v-on:click.once='answerTrack(0)')
							md-icon.iconButton#volume0(v-on:click.native='playTrack(0)') music_note
								md-tooltip(v-if='availableTracks[0].is_playable==false', md-direction='top') Unavailable
					.col-sm-12.center-block.no-padding
						.col-sm-6.center-block.no-padding
							md-button.md-raised.dynamicButton.answerButton#button1(v-on:click.once.native.self='answerTrack(1)', :style='{color: body, backgroundColor: back}')
								img.image(:src='availableTracks[1].album.images[2].url', v-on:click.once='answerTrack(1)')
								span(v-text='availableTracks[1].name', v-on:click.once='answerTrack(1)')
								md-icon.iconButton#volume1(v-on:click.native='playTrack(1)') music_note
									md-tooltip(v-if='availableTracks[1].is_playable==false', md-direction='top') Unavailable
						.col-sm-6.center-block.no-padding
							md-button.md-raised.dynamicButton.answerButton#button2(v-on:click.once.native.self='answerTrack(2)', :style='{color: body, backgroundColor: back}')
								img.image(:src='availableTracks[2].album.images[2].url', v-on:click.once='answerTrack(2)')
								span(v-text='availableTracks[2].name', v-on:click.once='answerTrack(2)')
								md-icon.iconButton#volume2(v-on:click.native='playTrack(2)') music_note
									md-tooltip(v-if='availableTracks[2].is_playable==false', md-direction='top') Unavailable
					.col-sm-12.center-block.no-padding
						md-button.md-raised.dynamicButton.answerButton#button3(v-on:click.once.native.self='answerTrack(3)', :style='{color: body, backgroundColor: back}')
							img.image(:src='availableTracks[3].album.images[2].url', v-on:click.once='answerTrack(3)')
							span(v-text='availableTracks[3].name', v-on:click.once='answerTrack(3)')
							md-icon.iconButton#volume3(v-on:click.native='playTrack(3)') music_note
								md-tooltip(v-if='availableTracks[3].is_playable==false', md-direction='top') Unavailable
			br
			.col-sm-12.text-center.progressArea.no-padding(v-if='isReady && gameFinished && ready')
				div(v-if='gameState==false')
					.col-sm-6.center-block.no-padding
						md-button.md-raised.dynamicButton#backButton(v-on:click.native='resetGame', :style='{color: body, backgroundColor: back}') Genre Selection
							i.material-icons.pull-left.iconButton(:style='{color: body}') sort
					.col-sm-6.center-block.no-padding
						md-button.md-raised.dynamicButton#retryButton(v-on:click.native='retryGame', :style='{color: body, backgroundColor: back}') Retry with same genre
							i.material-icons.pull-right.iconButton(:style='{color: body}') replay
				div(v-if='gameState==true')
					.col-sm-12.center-block.no-padding
						md-button.md-raised.dynamicButton#continueButton(v-on:click.native='continueGame', :style='{color: body, backgroundColor: back}') Continue
							i.material-icons.pull-right.iconButton(:style='{color: body}') forward
			component(:show='showInterludeWindow', :condition='condition', is='interlude')
				.emoji(:class='emoji')
	br
</template>

<style lang="stylus">
</style>
