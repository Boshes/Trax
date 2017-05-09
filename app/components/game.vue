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
		console.log("the genre", this.genre)
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
				this.$Progress.tempColor('rgb(50,205,50)')
				this.$Progress.set(100)
				this.timer = setInterval(function(){
					this.$Progress.decrease(10)
					if(this.$Progress.get()==50){
						this.$Progress.tempColor('rgb(255,255,0)')
					}
					if(this.$Progress.get()==20){
						this.$Progress.tempColor('rgb(255,165,0)')
					}
					if(this.$Progress.get()==10){
						this.$Progress.tempColor('rgb(255,0,0)')
					}
					if(this.$Progress.get()==0){
						this.isAnswered = true
						this.clearBar()
						this.$Progress.set(100)
						this.loseRound()
					}
				}.bind(this),1000)
				eventHub.$emit('timer', this.timer)
			}
		},
		'gameFinished': function(){
			if(this.gameFinished==true && this.selectedAnswer!=null){
				if(this.gameState==true){
					this.setInterludeWindow(this.gameState)
					for(var i=0; i<4;i++){
						if(i==this.selectedAnswer){
							$('#button'+this.selectedAnswer).css('border', '3px solid rgb(100,218,70)')
						}
						else{
							$('#button'+i).fadeOut('fast')
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
							$('#button'+this.correctAnswer).css('border', '3px solid rgb(100,218,70)')
						}
						else{
							$('#button'+i).fadeOut('fast')
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
				span.md-display-4(v-if='isReady && ready', v-text='artist.name', :style='{color: title}')
			transition(name='slide-fade')
				md-speed-dial.md-fab-top-right(v-if='isReady && ready', md-open="hover", md-theme='light-blue', md-direction="left", :style='{color: title}')
					md-button.md-fab(md-fab-trigger)
						md-icon(md-icon-morph) info
						md-icon info outline
					md-button.md-fab-md-primary.md-mini-md-clean
						md-icon search
			br
			br
			.col-sm-12
				.col-sm-6.pull-left
					span.md-display-1(:style='{color: title}') Points
					br
					i-odometer(:value='points', :style='{color: body}')
				.col-sm-6.pull-right
					span.md-display-1(:style='{color: title}') High Score
					br
					i-odometer(:value='highScore', :style='{color: body}')
			br
			transition(name='slide-fade')
				div(v-if='isReady && ready')
					.col-sm-12.center-block
						md-button.md-raised.dynamicButton#button0(v-text='availableTracks[0].name', v-on:click.once.native='answerTrack(availableTracks[0], 0)', :style='{color: body, backgroundColor: back}')
					.col-sm-12.center-block
						.col-sm-6
							md-button.md-raised.dynamicButton#button1(v-text='availableTracks[1].name', v-on:click.once.native='answerTrack(availableTracks[1], 1)', :style='{color: body, backgroundColor: back}')
						.col-sm-6
							md-button.md-raised.dynamicButton#button2(v-text='availableTracks[2].name', v-on:click.once.native='answerTrack(availableTracks[2], 2)', :style='{color: body, backgroundColor: back}')
					.col-sm-12.center-block
						md-button.md-raised.dynamicButton#button3(v-text='availableTracks[3].name', v-on:click.once.native='answerTrack(availableTracks[3], 3)', :style='{color: body, backgroundColor: back}')
			br
			.col-sm-12.text-center(v-if='isReady && gameFinished && ready')
				div(v-if='gameState==false')
					.col-sm-6
						md-button.md-raised.center-block.dynamicButton#backButton(v-on:click.native='resetGame', :style='{color: body, backgroundColor: back}') Genre Selection
					.col-sm-6
						md-button.md-raised.center-block.dynamicButton#retryButton(v-on:click.native='retryGame', :style='{color: body, backgroundColor: back}') Retry with same genre
				div(v-if='gameState==true')
					md-button.md-raised.center-block.dynamicButton#continueButton(v-on:click.native='continueGame', :style='{color: body, backgroundColor: back}') Continue
			component(:show='showInterludeWindow', :condition='condition', is='interlude')
				.emoji(:class='emoji')
	br
</template>

<style lang="stylus">
</style>
