<template>
<v-container px-10 fluid>
  {{$route.params.dir}}
  {{list}}
</v-container>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
        }
    }
}
</script>
