<script>
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
		eventHub.$on('timer', function(timer){
			this.timer = timer
		}.bind(this))
	},
	methods: {
		'toggleView': function(){
			this.currentView = this.currentView === 'setup' ? 'game' : 'setup'
		},
		'back': function(){
			if(this.timer!=null){
				this.clearBar()
			}
			this.$Progress.set(0)
			this.genre = null
			this.selectedGenre = null
			this.availableTracks = []
	    	this.artist = {}
	    	this.albums = []
			this.currentView = 'setup'
			this.backgroundImage = 'url(./assets/lol.jpg)'
		}
	}
}
</script>

<template lang="jade">
#vue-app
	vue-progress-bar
	#vue-wrapper.dynamicBackground(:style='{"background-image": backgroundImage }')
		.container-fluid
			i.material-icons(v-if='currentView=="game"', v-on:click='back') keyboard_backspace
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
	padding 5px
.genreArea
	display flex
	flex-wrap wrap
	justify-content center
.md-button
	text-transform none
.buttonArea
	width 30%
	margin 1%
.buttonArea:nth-oftype(3n)
	margin-right 0
.buttonArea:nth-of-type(3n+1)
	margin-left 0
.dynamicButton
	background-color white
	color #000
	border-radius 10em
	border 1px solid #eee
	word-wrap normal
	white-space normal
	width 250px
	padding 10px
.correct
	border 1px solid green
.wrong
	border 1px solid red
.slide-fade-enter-active
	transition all .5s ease
.slide-fade-leave-active
	transition all .5s cubic-bezier(1.0,0.5,0.8,1.0)
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
