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
		}
	}
}
</script>

<template lang="jade">
#game
	.container-fluid
		md-spinner.center-block(md-indeterminate, v-if='!isReady')
		div.text-center(v-if='isReady')
			span.md-display-4(style='background-color:white;') {{artist.name}}
			div(v-for='(track, index) in availableTracks')
				md-button.md-raised.dynamicButton.col-sm-3(v-text='track.name', v-on:click.native='answerTrack(track)')
</template>

<style lang="stylus">
</style>
