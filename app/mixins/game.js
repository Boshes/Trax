/**
 * Game Mixin
 * Controls Game
 */

//- imports
var AdapterMixin = require('../mixins/adapter')
/////////////////////////////////////////////////

//- instantiate
var vue = {
	computed: {
	    'albumsReady':function(){
	        return this.albums.length > 0
	    }
	},
	components: {},
	data: function(){
	  return{
	      genres: ['Alternative Rock','Dubstep','Indie Rock','Industrial','Metal','Pop','Rap','Rock','Ska'],
	      selectedGenre: null,
	      collection: [],
	      artist: {},
	      albums: [],
	      isReady: false
	  }  
	},
	key: 'collection',
	mixins: [AdapterMixin],
	route: {},
	methods: {
	    getArtistAlbums: function(genre){
	        this.searchArtistAlbums(genre)
	    },
	    getAlbumTracks: function(albums){
	    	this.searchAllTracks(albums)
	    }
	}
}
module.exports = vue
/////////////////////////////////////////////////
