<template>
<v-container fluid>
  <v-radio-group v-model=selected>
    <v-radio
      v-for="key in Object.keys(options)"
      :key=key
      :label="`${key}: $${options[key].cost}`"
      :value=key
      >
    </v-radio>
  </v-radio-group>
  1x {{selected}} ${{options[selected].cost.toFixed(2)}}<br>
  subtotal: ${{options[selected].cost.toFixed(2)}}<br>
  <v-divider class="py-5" style="max-width: 20%"/>
  handling fee: ${{(options[selected].cost * .02).toFixed(2)}}<br>
  tax: ${{(options[selected].cost * .07).toFixed(2)}}<br>
  <br>
  total: ${{getTotal().toFixed(2)}}
  <v-divider/>
  <div class="py-5" id="paypal-button"></div>
</v-container>
</template>

<script>
export default {
    data: () => ({
        selected: 'membership',
        options: {
            'membership': {
                cost: 2,
            },
            'donation': {
                cost: 10
            },
            'penalty': {
                cost: 50
            },
        },
    }),
    methods: {
        getTotal() {
            const sub = this.options[this.selected].cost
            return sub + sub * .07 + sub * .02
        }
    },
    mounted() {
        var vm = this
        this.$loadScript("https://www.paypalobjects.com/api/checkout.js")
            .then(() => {
                paypal.Button.render({
                    env: 'sandbox',
                    client: {
                        sandbox: 'Abvpp7waGKupSk7svxlJMV8REpPDM87g_0Jd3OhJEN8dUVyuWrg6BKMs5932JRtepp4NuUfiKCXngT6E',
                    },

                    locale: 'en_US',
                    style: {
                        size: 'medium',
                        color: 'gold',
                        shape: 'pill',
                    },

                    commit: true,

                    payment: function(data, actions) {
                        return actions.payment.create({
                            transactions: [{
                                amount: {
                                    total: vm.getTotal(),
                                    currency: 'USD',
                                },
                                description: vm.selected
                            }]
                        });
                    },

                    onAuthorize: function(data, actions) {
                        return actions.payment.execute().then(function() {
                            window.alert('Thank you for your purchase!');
                        });
                    }
                }, '#paypal-button');

                console.log('notification mounted');
            })
    },
}
</script>
