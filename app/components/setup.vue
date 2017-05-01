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
			span.md-display-4(style='background-color:white;') Trax
			div(v-for='genre in genres')
				md-button.md-raised.dynamicButton.col-sm-2(v-text='genre', v-on:click.native='selectGenre(genre)')
		.col-sm-12(v-if='selectedGenre')
			h4.col-sm-6 {{selectedGenre}}
			md-button.col-sm-6.md-raised.dynamicButton.center-block(v-on:click.native='play') Lock In
</template>

<style lang="stylus">
</style>
