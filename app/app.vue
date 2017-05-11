<script>
import 'vue-material-css'
import 'emojis'
import { eventHub } from './event.js'
import Vibrant from 'node-vibrant'
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
			genre: null,
			bodyColor: null,
			titleColor: null,
			backColor: null
		}
	},
	computed: {
	},
	created: function () {
		this.currentView = 'setup'
		this.dynamicColorChanger(this.backgroundImage)
		eventHub.$on('start game', function(genre){
			this.genre = genre
			this.toggleView()
		}.bind(this))
		eventHub.$on('background', function(background){
			this.dynamicColorChanger(background)
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
		'dynamicColorChanger': function(background){
			var img = document.createElement('img')
			img.setAttribute('src', background.substring(4, background.length-1))
			img.crossOrigin = 'Anonymous'
			img.addEventListener('load', function(img) {
				var vibrant = new Vibrant(img)
				vibrant.getPalette(function(err, palette){
					this.bodyColor = palette['LightVibrant']!=null ? palette['LightVibrant'].getHex().toString() : palette['LightMuted'].getHex().toString()
					this.titleColor = palette['Vibrant'] != null ? palette['Vibrant'].getHex().toString() : palette['Muted'].getHex().toString()
					this.backColor = palette['DarkMuted'].getHex().toString()
					this.backgroundReady = true
				}.bind(this))
			}.bind(this, img))
		},
		'resetSettings': function(){
			this.toggleView()
			if(this.timer!=null){
				this.clearBar()
			}
			this.isAnswered = false
			this.albumsReady = false
	    	this.gameFinished = false
	    	this.gameState = false
	    	this.emoji = null
			this.$Progress.set(0)
			this.genre = null
			this.selectedGenre = null
			this.availableTracks = []
	    	this.artist = {}
	    	this.albums = []
			this.backgroundImage = 'url(./assets/background.jpg)'
			this.dynamicColorChanger(this.backgroundImage)
		}
	}
}
</script>

<template lang="jade">
#vue-app
	vue-progress-bar
	#vue-wrapper.dynamicBackground(:style='{"background-image": backgroundImage }')
		.container-fluid(v-if='backgroundReady==true')
			i.material-icons.backButton(v-if='currentView=="game"', v-on:click='resetSettings', :style='{color: titleColor}') keyboard_backspace
			transition(name='slide-fade')
				component(:is='currentView', :genre='genre', :body='bodyColor', :title='titleColor', :back='backColor', :ready='backgroundReady')
			br
	#vue-footer
		.container-fluid.no-padding
			.col-sm-12.text-center.no-padding
				h3 Trax
				h4.small Popular Song Guessing Game with Spotify
				h4
					a(href='https://www.github.com/boshes/trax') Find me on GitHub
						
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
.genreArea
	direction ltr
	display flex
	flex-direction row
	flex-wrap wrap
.buttonArea
	width 30%
	margin 1%
.buttonArea:nth-oftype(3n)
	margin-right 0
.buttonArea:nth-of-type(3n+1)
	margin-left 0
.backButton
	margin-left 10px
	margin-top 30px
	transform scale(2)
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
	&.answerButton > span, &.answerButton > img
		vertical-align middle
		line-height 4
.md-button
	text-transform none
.slide-fade-enter-active
	transition all .2s ease
.slide-fade-leave-active
	transition all .2s cubic-bezier(1.0,0.5,0.8,1.0)
.slide-fade-enter, .slide-fade-leave-to
	transform translateX(10px)
	opacity 0
.spinnerShade
	position fixed
	top 50%
	left 50%
	transform translate(-50%, -50%)
	transition all .2s ease
	z-index 999999
.scrollbar
	direction rtl
	height 500px
	overflow-y scroll
.scrollbar::-webkit-scrollbar-track
	-webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.3)
	background-color #F5F5F5
.scrollbar::-webkit-scrollbar
	width 10px
	background-color #F5F5F5
.scrollbar::-webkit-scrollbar-thumb
	background-color #0ae
	background-image -webkit-linear-gradient(45deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
.interludeShade
	overflow auto
	position fixed
	left 0
	top 0
	right 0
	bottom 0
	z-index 999999
	transition opacity .2s ease
.successShade
	background -webkit-linear-gradient(left, rgba(100,218,70,0.8) 0%, rgba(100,218,70,0.5) 5%, rgba(100,218,70,0) 15%, rgba(100,218,70,0) 85%, rgba(100,218,70,0.5) 95%, rgba(100,218,70,0.8) 100%)
.failureShade
	background -webkit-linear-gradient(left, rgba(255,99,71,0.8) 0%, rgba(255,99,71,0.5) 5%, rgba(255,99,71,0) 49%, rgba(255,99,71,0) 85%, rgba(255,99,71,0.5) 95%, rgba(255,99,71,0.8) 100%)
.emoji
	transform scale(2)
.iconButton
	margin-top 5px
	transform scale(1.4)
.image
	padding-left 1em
	float left
.progressArea
	padding-top 10%
.interludeContainer
	position fixed
	top 50%
	left 50%
	transform translate(-50%, -50%)
	transition all .2s ease
.interlude-enter, .interlude-leave-active
	opacity 0
.interlude-enter .interludeContainer, .interlude-leave-active .interludeContainer
    opacity 1
    transition fade 2s linear
[v-cloak]
	display none!important
@media only screen and (max-width: 767px), (min-device-width: 320px) and (max-device-width: 767px)
	.contentWrapper
		flex-direction column !important
	.scrollbar
		width 100% !important
	.dynamicButton
		font-size 14px !important
		&.genreButton
			width 100% !important
			line-height normal !important
		&.answerButton
			width 100% !important
		&#continueButton
			width 100% !important
		&#backButton
			width 100% !important
		&#retryButton
			width 100% !important
	.no-padding
		padding-left 0px !important
		padding-right 0px !important
	.progressArea
		padding-top 10% !important
/*@media only screen and (orientation:landscape)*/
/*	.contentWrapper*/
/*		flex-direction column !important*/
/*	.scrollbar*/
/*		width 100% !important*/
@media only screen and (min-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px)
	.contentWrapper
		flex-direction column !important
	.scrollbar
		width 100% !important
		height 700px !important
@media only screen and (min-width: 1024px)
	.contentWrapper
		flex-direction row !important
</style>
