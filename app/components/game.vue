<script>
import { eventHub } from '../event.js'
var GameMixin = require('../mixins/game')

export default {
	name: 'Game',
	components: {
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
					this.clearBar()
					this.$Progress.set(100)
					this.loseRound()
				}
			}.bind(this),1000)
			eventHub.$emit('timer', this.timer)
		}
	}
}
</script>

<template lang="jade">
#game
	.container-fluid
		md-spinner.center-block(md-indeterminate, v-if='!isReady')
		div.text-center(v-if='isReady')
			span.md-display-4 {{artist.name}}
			br
			.col-sm-12
				.col-sm-6
					span Points
			br
			.col-sm-12.center-block
				md-button.md-raised.dynamicButton(v-text='availableTracks[0].name', v-on:click.once.native='answerTrack(availableTracks[0])')
			.col-sm-12.center-block
				.col-sm-6
					md-button.md-raised.dynamicButton(v-text='availableTracks[1].name', v-on:click.once.native='answerTrack(availableTracks[1])')
				.col-sm-6
					md-button.md-raised.dynamicButton(v-text='availableTracks[2].name', v-on:click.once.native='answerTrack(availableTracks[2])')
			.col-sm-12.center-block
				md-button.md-raised.dynamicButton(v-text='availableTracks[3].name', v-on:click.once.native='answerTrack(availableTracks[3])')
</template>

<style lang="stylus">
</style>
