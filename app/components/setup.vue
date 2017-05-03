<script>
import { eventHub } from '../event.js'
var GameMixin = require('../mixins/game')

export default {
	name: 'Setup',
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
	},
	methods: {
		'selectGenre':function(genre){
			return this.selectedGenre = genre
		},
	    'play':function(){
	        if(this.selectedGenre!=null){
	        	eventHub.$emit('start game', this.selectedGenre)
	        }
	    }
	}
}
</script>

<template lang="jade">
#setup
	.container-fluid
		.col-sm-12.text-center
			span.md-display-4.dynamicColor Trax
		br
		.col-sm-12.text-center.contentWrapper
			.col-sm-6.contentArea.genreArea.scrollbar
				.buttonArea(v-for='genre in genres')
					md-button.md-raised.dynamicButton.genreButton.dynamicColor(v-text='genre', v-on:click.native='selectGenre(genre)')
			br
			.col-sm-6.contentArea(v-if='selectedGenre')
				span.md-display-3.center-block.dynamicColor(v-text='selectedGenre')
				md-button.md-raised.col-sm-6.center-block.dynamicButton.dynamicColor(v-on:click.native='play') Lock In
</template>

<style lang="stylus">
</style>
