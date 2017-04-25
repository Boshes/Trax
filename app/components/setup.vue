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
	        	console.log(this.selectedGenre, eventHub)
	        	eventHub.$emit('start game', this.selectedGenre)
	        }
	    }
	}
}
</script>

<template lang="jade">
#setup
	.container-fluid
		.col-sm-12
			ul(v-for='genre in genres')
				li.md-button.md-raised.col-sm-2(v-text='genre', v-on:click='selectGenre(genre)')
		.col-sm-12(v-if='selectedGenre')
			h4.col-sm-6 {{selectedGenre}}
			button.col-sm-6.btn.btn-default.center-block(v-on:click='play') Lock In
</template>

<style lang="stylus">
</style>
