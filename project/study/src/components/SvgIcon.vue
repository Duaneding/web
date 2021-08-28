<template>
  <svg :class="SvgClass" v-on="$listeners">
      <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
    props:{
        iconClass:{
            required:true,
            type:String,
            default:''
        },
        className:{
            type:String,
            default:''
        }
    },
    computed:{
        iconName(){
            return '#icon-' + this.iconClass
        },
        SvgClass(){
            if(this.iconClass)return "svg-icon " + this.iconClass
            return "svg-icon "
        }
    }
}
</script>

<style>
    .svg-icon{
        width:1em;
        height:1em;
        vertical-align: -0.15em;
        fill:currentColor;
        overflow: hidden;
    }
</style>