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
		eventHub.$on('reset game', function(){
			this.resetSettings()
		}.bind(this))
	},
	methods: {
		'toggleView': function(){
			this.currentView = this.currentView === 'setup' ? 'game' : 'setup'
		},
		'resetSettings': function(){
			this.toggleView()
			if(this.timer!=null){
				this.clearBar()
			}
			this.isAnswered = false
			this.albumsReady = false
	    	this.gameFinished = false
			this.$Progress.set(0)
			this.genre = null
			this.selectedGenre = null
			this.availableTracks = []
	    	this.artist = {}
	    	this.albums = []
			this.backgroundImage = 'url(./assets/background.jpg)'
		}
	}
}
</script>

<template lang="jade">
#vue-app
	vue-progress-bar
	#vue-wrapper.dynamicBackground(:style='{"background-image": backgroundImage }')
		.container-fluid
			i.material-icons.dynamicColor(v-if='currentView=="game"', v-on:click='resetSettings') keyboard_backspace
			transition(name='slide-fade')
				component(:is='currentView', :genre='genre')
			br
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
	color white
#vue-footer
	background-color #333
	flex-shrink 0
	color #eee
	padding 5px
.contentWrapper
	display flex
	flex-direction row
	justify-content center
	align-items center
	align-content stretch
	min-height 100%
.contentArea
	display flex
	flex 1
	flex-grow 1
	flex-shrink 1
	justify-content center
	flex-direction column
	overflow hidden
	padding-left 0px
	padding-right 0px
	&.genreArea
		flex-direction row
		flex-wrap wrap
		height 500px
.buttonArea
	width 30%
	margin 1%
.buttonArea:nth-oftype(3n)
	margin-right 0
.buttonArea:nth-of-type(3n+1)
	margin-left 0
/*.dynamicColor*/
/*	background-image inherit !important*/
/*	color transparent !important*/
/*	filter contrast(20%) saturate(20) brightness(150%)*/
/*	-webkit-background-clip text !important*/
/*	-webkit-filter contrast(20%) saturate(20) brightness(150%)*/
.dynamicButton
	background-color transparent
	border 1px solid #eee
	border-radius 10em
	font-size 18px
	padding 10px
	width 300px
	white-space normal
	word-wrap normal
	&.genreButton
		width 200px
.correct
	border 1px solid green
.wrong
	border 1px solid red
	align-content stretch
.md-button
	text-transform none
.slide-fade-enter-active
	transition all .2s ease
.slide-fade-leave-active
	transition all .2s cubic-bezier(1.0,0.5,0.8,1.0)
.slide-fade-enter, .slide-fade-leave-to
	transform translateX(10px)
	opacity 0
.scrollbar::-webkit-scrollbar-track
	-webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.3)
	background-color #F5F5F5
.scrollbar::-webkit-scrollbar
	width 10px
	background-color #F5F5F5
.scrollbar::-webkit-scrollbar-thumb
	background-color #0ae
	background-image: -webkit-linear-gradient(45deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
[v-cloak]
	display none!important
</style>
