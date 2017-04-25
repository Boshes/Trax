<script>
import Vue from 'vue'
import 'vue-material-css'

import { eventHub } from './event.js'
var GameMixin = require('./mixins/game')

export default {
	name: 'Main',
	components: {
		setup: require('./components/setup.vue'),
		game: require('./components/game.vue')
	},
	mixins: [GameMixin],
	data: function () {
		return {
			currentView: '',
			genre: null
		}
	},
	computed: {
	},
	created: function () {
		this.currentView = 'setup'
		eventHub.$on('start game', function(genre){
			this.genre = genre
			this.toggleView()
		}.bind(this))
	},
	methods: {
		'toggleView': function(){
			this.currentView = this.currentView === 'setup' ? 'game' : 'setup'
		}
	}
}
</script>

<template lang="jade">
#vue-app
	#vue-wrapper
		.container-fluid
			h5.text-center Trax
			component(:is='currentView', :genre='genre')
</template>

<style lang="stylus">
html, body, #app
	min-height 100%
	height 100%
#vue-app
	height 100vh
	display flex
	flex-direction column
#vue-wrapper
	flex 1 0 auto
[v-cloak]
	display none!important
.font-bold
	font-weight bold
.font-bold > span.small
	margin-left 0.5em
</style>
