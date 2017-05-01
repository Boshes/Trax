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
		eventHub.$on('background', function(background){
			this.backgroundImage = background
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
	#vue-wrapper.dynamicBackground(:style='{"background-image": backgroundImage }')
		.container-fluid
			transition(name='slide-fade')
				component(:is='currentView', :genre='genre')
	#vue-footer
		.container-fluid
			.row.col-sm-12.text-center
				h5 Trax
				p.small.muted Spotify Game
				p
					a(href='https://www.github.com/boshes/trax') More Info
						
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
	background-repeat no-repeat
	background-position center
	background-size cover
#vue-footer
	background-color #333
	flex-shrink 0
	color #eee
	padding 20px
.md-button
	text-transform none
.dynamicButton
	background-color white
	color #000
	border-radius 10em
	border 1px solid black
	word-wrap break-word
.slide-fade-enter-active
	transition all .2s ease
.slide-fade-leave-active
	transition all .2s cubic-bezier(1.0,0.5,0.8,1.0)
.slide-fade-enter, .slide-fade-leave-to
	transform translateX(10px)
	opacity 0
[v-cloak]
	display none!important
.font-bold
	font-weight bold
.font-bold > span.small
	margin-left 0.5em
</style>
