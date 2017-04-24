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
				console.log("ready")
				this.getAlbumTracks()
			}
		}
	}
}
</script>

<template lang="jade">
#game
	.container-fluid
		pre {{genre}}
		pre {{collection}}
		//spinner(v-if='!isReady')
		div(v-if='isReady')
			h5.text-center Derp
			
</template>

<style lang="stylus">
</style>
