<script>
import Vue from 'vue'
import 'vue-material'
import 'bootstrap-css'

var AdapterMixin = require('./mixins/adapter')
var GameMixin = require('./mixins/game')

var vue = Vue.extend({
	name: 'Main',
	components: {
		setup: require('./components/setup.vue'),
		game: require('./components/game.vue')
	},
	mixins: [AdapterMixin,GameMixin],
	data: function () {
		return {

		}
	},
	computed: {},
	created: function () {
	},
	methods: {},
	events: {}
})

module.exports = vue
</script>

<template lang="jade">
#vue-app
	#vue-wrapper
		.container-fluid
			h5.text-center TODO
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
