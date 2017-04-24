import Vue from 'vue'

// double bounce
var template = "<div class='spinner'><div class='double-bounce1'></div><div class='double-bounce2'></div><style>.spinner {width: 40px;height: 40px;position: relative;margin: 100px auto;}.spinner-tight {margin: 14px auto;width: 14px;height: 14px;}.spinner-inline {margin: 0 0;display: inline-block;}.double-bounce1, .double-bounce2 {width: 100%;height: 100%;border-radius: 50%;background-color: #aaa;opacity: 0.6;position: absolute;top: 0;left: 0;-webkit-animation: sk-bounce 2.0s infinite ease-in-out;animation: sk-bounce 2.0s infinite ease-in-out;}.double-bounce2 {-webkit-animation-delay: -1.0s;animation-delay: -1.0s;}@-webkit-keyframes sk-bounce {0%, 100% { -webkit-transform: scale(0.0) }50% { -webkit-transform: scale(1.0) }}@keyframes sk-bounce {0%, 100% {transform: scale(0.0);-webkit-transform: scale(0.0);} 50% {transform: scale(1.0);-webkit-transform: scale(1.0);}}</style></div>"

var spinner = Vue.extend({
	template: template
});

exports.install = function (Vue, options) {
	Vue.component('spinner', spinner)
}
