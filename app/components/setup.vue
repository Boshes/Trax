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
	},
	props:{
		'back':{
			required: true
		},
		'body':{
			required: true
		},
		'title':{
			required: true
		},
		'ready':{
			required: true
		}
	}
}
</script>

<template lang="jade">
#setup
	.container-fluid(v-if='ready')
		.col-sm-12.text-center
			span.md-display-4(:style='{color: title}') Trax
		br
		.col-sm-12.text-center.contentWrapper
			.col-sm-6.contentArea.scrollbar
				.genreArea
					.buttonArea(v-for='genre in genres')
						md-button.md-raised.dynamicButton.genreButton(v-text='genre', v-on:click.native='selectGenre(genre)', :style='{color: body, backgroundColor: back}')
			br
			.col-sm-6.contentArea(v-if='selectedGenre')
				span.md-display-3.center-block(v-text='selectedGenre', :style='{color: title}')
				br
				md-button.md-raised.col-sm-6.center-block.dynamicButton(v-on:click.native='play', :style='{color: body, backgroundColor: back}') Lock In
		
</template>

<style lang="stylus">
</style>
