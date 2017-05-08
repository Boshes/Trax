<script>

export default {
    name: 'Interlude',
    template: '<div class="interludeHolder"><transition name="interlude"><div :class="backgroundClass" v-if="show && activeCondition(condition)"><div class="interludeContainer"><slot></slot></div></div></transition></div>',
    props: {
        show: {
            type: Boolean,
            required: true
            
        },
        condition: {
            type: String
        }
    },
    data: function(){
        return {
            backgroundClass: null
        }
    },
    methods:{
        activeCondition: function(condition){
            if(condition=='success'){
                this.backgroundClass = 'interludeShade successShade'
            }
            else{
                this.backgroundClass = 'interludeShade failureShade'
            }
            return this.$parent.condition === condition
        }
    }
}
</script>