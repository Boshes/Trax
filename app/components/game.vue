<script>
import { eventHub } from '../event.js'
var GameMixin = require('../mixins/game')
import IOdometer from 'vue-odometer'

export default {
	name: 'Game',
	components: {
		IOdometer
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
	},
	methods: {
	    'choose':function(track){
	    	if(track!=null){
	    		console.log(track)
	    	}
	    }
	},
	props: {
		'genre':{
			type: String,
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
		}
	}
}
</script>

<template lang="jade">
#game
	.container-fluid
		md-spinner.center-block(md-indeterminate, style='margin: 0 auto;', v-if='!isReady')
		div.text-center
			transition(name='slide-fade')
				span.md-display-4.dynamicColor(v-if='isReady', v-text='artist.name')
			transition(name='slide-fade')
				md-speed-dial.md-fab-top-right(v-if='isReady', md-open="hover", md-direction="left", md-theme='light-blue')
					md-button.md-fab(md-fab-trigger)
						md-icon(md-icon-morph) info
						md-icon info outline
					md-button.md-fab-md-primary.md-mini-md-clean
						md-icon search
			br
			.col-sm-12
				.col-sm-6.pull-left
					span.md-display-1.dynamicColor Points
					br
					i-odometer.dynamicColor(:value='points')
				.col-sm-6.pull-right
					span.md-display-1.dynamicColor High Score
					br
					i-odometer.dynamicColor(:value='highScore')
			br
			transition(name='slide-fade')
				div(v-if='isReady')
					.col-sm-12.center-block
						md-button.md-raised.dynamicButton.dynamicColor(v-text='availableTracks[0].name', v-on:click.once.native='answerTrack(availableTracks[0])')
					.col-sm-12.center-block
						.col-sm-6
							md-button.md-raised.dynamicButton.dynamicColor(v-text='availableTracks[1].name', v-on:click.once.native='answerTrack(availableTracks[1])')
						.col-sm-6
							md-button.md-raised.dynamicButton.dynamicColor(v-text='availableTracks[2].name', v-on:click.once.native='answerTrack(availableTracks[2])')
					.col-sm-12.center-block
						md-button.md-raised.dynamicButton.dynamicColor(v-text='availableTracks[3].name', v-on:click.once.native='answerTrack(availableTracks[3])')
			br
			.col-sm-12.text-center(v-if='isReady && gameFinished')
				div(v-if='gameState==false')
					.col-sm-6
						md-button.md-raised.center-block.dynamicButton.dynamicColor(v-on:click.native='resetGame') Genre Selection
					.col-sm-6
						md-button.md-raised.center-block.dynamicButton.dynamicColor(v-on:click.native='retryGame') Retry with same genre
				div(v-if='gameState==true')
					md-button.md-raised.center-block.dynamicButton.dynamicColor(v-on:click.native='continueGame') Continue
				
</template>

<style lang="stylus">
</style>
