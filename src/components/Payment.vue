<template>
<v-container fluid>
  <v-radio-group v-model=selected>
    <v-radio
      v-for="key in Object.keys(options)"
      :key=key
      :label="`${key}: $${options[key].cost.toFixed(2)}`"
      :value=key
      >
    </v-radio>
  </v-radio-group>
  <div v-if="options[selected].date">
    <v-date-picker
      range
      v-model=range
      :allowed-dates="allowedDates"
      ></v-date-picker>
  </div>
  <div
    v-for="key in Object.keys(extras)"
    :key=key
    >
    <v-text-field
      v-if="options[selected][key]"
      :label=key
      v-model=extras[key]
      style="max-width: 20%"
      :rules="[v=> !!v || 'required']"
      >

    </v-text-field>
  </div>

  {{getDays()}}x {{selected}} ${{getCost().toFixed(2)}}<br>
  Paypal processing fee: ${{getPaypalFee().toFixed(2)}}<br>
  Subtotal: ${{(getPaypalFee() + getCost()).toFixed(2)}}<br>
  Tax: ${{(0).toFixed(2)}}<br>
  <v-divider class="py-5" style="max-width: 20%"/>
  Total: ${{getTotal().toFixed(2)}}
  <v-divider/>
  <div class="py-5 disabled" id="paypal-button"></div>
</v-container>
</template>

<script>
export default {
    data: () => ({
        extras: {
            name: '',
            aanr_id: '',
            donation: 5,
        },
        range: [new Date().toISOString().substr(0,10)],
        selected: 'Membership (resident couple)',
        options: {
            'Membership (resident couple)': {
                cost: 1048.96,
            },
            'Grounds Fee': {
                cost: 20,
                date: true,
            },
            'Guest Fee (non-AANR member)': {
                cost: 25,
                date: true,
                name: true,
            },
            'Guest Fee (AANR member)': {
                cost: 20,
                date: true,
                name: true,
                aanr_id: true
            },
            'Campsite Fee': {
                cost: 15,
                date: true,
            },
            'Site License Transfer Fee': {
                cost: 100
            },
            'Donation': {
                cost: 5,
                donation: true
            },
        },
    }),
    methods: {
        getPaypalFee() {
            return 0.30 + this.getCost() * .029
        },
        getCost() {
            const cost = this.options[this.selected].cost
            if (this.options[this.selected].date && this.range.length == 2) {
                return this.getDays() * this.options[this.selected].cost
            } else return cost
        },
        getDays() {
            if (this.options[this.selected].date && this.range.length == 2) {
                const diffTime = Math.abs(Date.parse(this.range[1]) - Date.parse(this.range[0]));
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays + 1
            } else {
                return 1
            }
        },
        getTotal() {
            if (this.options[this.selected].donation) return parseInt(this.extras.donation)
            else return this.getCost() + this.getPaypalFee()
        },
        allowedDates(val) {
            return Date.parse(val) > new Date()
        },
        getDesc() {
            const key = this.selected
            const opt = this.options[key]
            return `${key}: `
                + ((opt.name) ? `Guest name: ${this.extras.name}\n` : '')
                + ((opt.date) ? `${this.range[0]} to ${this.range[1]}; ${this.getDays()} days\n` : '')
                + ((opt.aanr_id) ? `Guest AANR: ${this.extras.aanr_id}` : '')
        },
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
                        console.log(vm.getDesc())
                        return actions.payment.create({
                            transactions: [{
                                amount: {
                                    total: vm.getTotal(),
                                    currency: 'USD',
                                },
                                description: vm.getDesc()
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
