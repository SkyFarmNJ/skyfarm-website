<template>
<v-container fluid>

  <v-row class="text-left">
    <v-col lg="8" mb-5 class="text-left">
      <h2>Payments</h2>

      <v-card v-if="!selected">
        <v-card-title>
          Choose a Payment Category
        </v-card-title>
        <v-card-text>
          <v-row>
          <v-col
             lg="3"
             align="center"
             justify="center"
             v-for="key in Object.keys(options)"
             :key=key
             >
          <v-btn 
             v-model="selected"
             fab
             x-large
             :key=selected
             :value=key
             @click.stop="selected = key"
             :color=options[key].color
             ><v-icon>{{options[key].icon}}</v-icon></v-btn><br>
          <v-btn 
             v-model="selected"
             text
             :key=selected
             :value=key
             @click.stop="selected = key"
             >
            {{key}}
            </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <v-card v-if="selected">
        <v-card-title>
          {{selected}}
        </v-card-title>
        <v-card-subtitle class="text-left">
          {{options[selected].desc}}
        </v-card-subtitle>
        <v-card-text class="text-left">

          <v-data-table
             v-model="itemChoice"
             :headers="itemHeader"
             :items="options[selected].items"
             single-select
             item-key="name"
             show-select
             class="elevation-1"
             hide-default-footer
             calculate-widths
             disable-sort
             >
            <template v-slot:item.amount="{ item }">
              <span>${{item.amount.toFixed(2)}}</span>
            </template>
          </v-data-table>
          
          <v-row>
            <v-col lg="6">
              <div v-if="options[selected].date">
                <v-date-picker
                   multiple
                   v-model=range
                   class="pl-5"
                   ></v-date-picker>
              </div>
            </v-col>
            <v-col lg="6">
              <div
                 v-for="key in checkExtra"
                 :key=key
                 >
                <v-text-field
                   v-if="itemChoice[0]"
                   :label=exlabel[key]
                   v-model=extras[key]
                   style="max-width: 40%"
                   :rules="[v=> !!v || 'required']"
                   >
                </v-text-field>
              </div>
            </v-col>
          </v-row>

          <hr>
          <v-simple-table dense class="pl-lg-15" align="end">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td align="left">{{getDays()}}x {{selected}}</td>
                  <td align="right">${{getCost().toFixed(2)}}</td>
                </tr>
                <tr v-if="options[selected].taxable">
                  <td align="left" >Sales Tax {{taxrate}}%</td>
                  <td align="right">${{getSalesTax().toFixed(2)}}</td>
                </tr>
                <tr v-if="options[selected].cif">
                  <td align="left" >Capital Improvement Fund</td>
                  <td align="right">${{itemChoice[0].cif.toFixed(2)}}</td>
                </tr>
                <tr>
                  <td align="left" >Total:</td>
                  <td align="right">${{getOptionTotal().toFixed(2)}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          
          
<!--
          Paypal processing fee: ${{getPaypalFee().toFixed(2)}}<br>
          Subtotal: ${{(getPaypalFee() + getCost()).toFixed(2)}}<br>
          Tax: ${{(0).toFixed(2)}}<br>
          <v-divider class="py-5" style="max-width: 20%"/>
          Total: ${{getTotal().toFixed(2)}}
-->
          <v-divider/>
          <v-card-actions>
            <v-list-item-content>
              <v-btn 
                 @click.stop="goBack()"
                 > &lt;- back</v-btn>
            </v-list-item-content>
            <v-list-item-content align="right">     
              <v-btn @click="addToOrder()">Add to Order</v-btn>
            </v-list-item-content>
          </v-card-actions>
        </v-card-text>
      </v-card>
      
    </v-col>
    <v-col lg="4" mb-5 class="text-left">
      <h2>Order Summary</h2>
      <v-card v-if="isPreview()">
        <span icon v-if="!isPPLive()">
        <v-btn icon color="orange" @click="togglePaypal()"><v-icon>mdi-alert-circle</v-icon></v-btn> Paypal Sandbox</span>
        <span v-if=" isPPLive()">
        <v-btn icon color="green"  @click="togglePaypal()"><v-icon>mdi-alert-circle</v-icon></v-btn> Paypal LIVE!</span>
      </v-card>
      <v-data-table
         :headers="headers"
         :items="order"
         class="elevation-1"
         dense
         hide-default-header
         hide-default-footer
         calculate-widths
         >
        <template v-slot:item.amount="{ item }">
          <span>${{item.amount.toFixed(2)}}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
             small
             @click="deleteItem(item)"
             >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <hr>
      <v-simple-table dense class="pl-lg-15">
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Subtotal:</td>
              <td align="right">${{subtotal.toFixed(2)}}</td>
            </tr>
            <tr>
              <td>PayPal Fees:</td>
              <td align="right">${{getPaypalFee().toFixed(2)}}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td align="right">${{getTotal().toFixed(2)}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      
      <div align="right" class="py-5 disabled" id="paypal-button"></div>
      <div>
        <v-alert
           :value="alert"
           color="error"
           dark
           border="top"
           icon="mdi-home"
           transition="scale-transition"
           >
          WARNING:  You have enabled LIVE PayPal transactions.  Any payments you make are real.
          <br>
          <v-btn
             color="primary"
             @click="enableLive()"
             >
            OK
          </v-btn>

        </v-alert>
      </div>

    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
    data: () => ({
        alert: false,
        extrasDefaults: {
            guest: '',
            aanr_id: '',
            amt: '',
            purpose: '',
        },
        extras: {},
        exlabel: {
            guest: "Name of Guest:",
            aanr_id: "AANR Member ID:",
            amt: "Amount:",
            purpose: "Purpose of payment",
        },
        range: [new Date().toISOString().substr(0,10)],
        selected: null,
        itemChoice: null,
        taxrate: 6.625,
        itemHeader: [
            { text: "Item", value: "name"     },
            { text: "Amount", value: "amount", align: "end"  },
        ],
        options: {
            'Membership': {
                desc: "Yearly membership dues.",
                items: [
                    { name: "Resident Couple",     amount: 890, cif: 100 },
                    { name: "Resident Single",     amount: 445, cif:  50 },
                    { name: "Non-Resident Couple", amount: 280, cif: 100 },
                    { name: "Non-Resident Single", amount: 140, cif:  50 },
                ],
                taxable: true,
                cif: true,
                icon: "mdi-card-account-details-outline",
                color: "orange",
            },
            'Grounds Fee': {
                desc: "For non-resident members visiting Sky Farm",
                items: [
                    { name: "Single", amount: 20 },
                    { name: "Couple", amount: 40 },
                ],
                date: true,
                icon: 'mdi-pine-tree',
                color: "green",
            },
            'Guest Fee': {
                items: [
                    { name: "AANR Member",     amount: 20, guest: true, aanr_id: true },
                    { name: "Non-AANR Member", amount: 25, guest: true },
                ],
                date: true,
                icon: 'mdi-account-plus-outline',
                color: "blue",
            },
            'Campsite Fee': {
                items: [
                    { name: "Day Rate", amount: 15 },
                    { name: "Seasonal", amount: 600 },
                ],
                date: true,
                icon: 'mdi-tent',
                color: "brown",
            },
            'Other Payments': {
                cost: 5,
                items: [
                    { name: "Donation",                  amount:   0, amt: true, purpose: true },
                    { name: "General Payment",           amount:   0, amt: true, purpose: true },
                    { name: "Site License Transfer Fee", amount: 100 },
                ],
                icon: 'mdi-cash-usd-outline',
                color: "yellow",
            },
        },
        headers: [
            { text: 'Item', value: 'thing' },
            { text: 'Amount', value: 'amount', align: "end" },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        order: [],
        subtotal: 0,
        paypal: {
            id: '',
            sand: 'AdrZYH_SrkFk8DQ8N7bcyAN5sSC67w0Nt0IqRAJpt4ClF3Y8FGkqC80xd4vHFg1gGK4sqrRhlqciQcC_', // SF SANDBOX
            live: 'ATuVEwdc_Ai8YKkfJI10l6Mnj87NxO_arJ6IgR_jxauAgiFNCemgXxw_5gihm398iLTYr6NrOZZRUvp2', // SF LIVE

//            sand:   'AYNl_K_60xs-14sYb7jheJRTzk7FOQDINZGhJN75ffofh4w6iHgNulgDijJcNfXTP4qzYd208iNVVb6y', // ds SANDBOX
//            live: 'ASSEm7kdswk2tkWve-NErqICn3_iHWKnoJhzplJuCrSkS1wcPNzePLu1nXy3FMU5ZizXBUhQNt8J6mLY', // ds LIVE

        },
        liveparam: null,
        override: false,
    }),
    methods: {
        thanks(details) {
            this.$router.push({ name: "ThankYou", params: { details: details }})
        },
        goBack() {
            this.selected   = null;
            this.itemChoice = null;
            this.setDefaults();
        },
        setDefaults() {
            this.extras = Object.assign({}, this.extrasDefaults)
        },
        addToOrder() {
            var desc = this.selected + "/" + this.itemChoice[0].name;
            if ( this.options[this.selected].date ) {
                desc += " " + this.getDays() + " days: " + this.range.length + ": \n   " + this.range.join(', ');
            }
            if ( this.extras.guest ) {
                desc += "\n Name: " + this.extras.guest
            }
            if ( this.extras.aanr_id ) {
                desc += "\n AANR: " + this.extras.aanr_id
            }
            if ( this.extras.purpose ) {
                desc += "\n Purpose: " + this.extras.purpose
            }
            this.order.push({ thing: desc, amount: this.getOptionTotal() });
            this.subtotal = 0
            for(var i in this.order) {
                this.subtotal += this.order[i].amount
            }
            this.goBack();
        },
/*
        checkExtra(key) {
            console.log("[Payment.checkExtra] key: " + key.key);
            if(this.itemChoice && key) {
                return this.itemChoice[0].[key.key]
            }
        },
*/
        deleteItem (item) {
            const index = this.order.indexOf(item);
            this.order.splice(index, 1);
            this.subtotal = 0
            for(var i in this.order) {
                this.subtotal += this.order[i].amount
            }
        },
        getPaypalFee() {
            var r = ( 100 - 2.9 ) / 100;
            var i = ( this.subtotal + 0.30 ) / r;
            var s = ( i - this.subtotal )
            return s;
            // return 0.30 + this.subtotal * .029
        },
        getSalesTax() {
            if ( this.options[this.selected].taxable ) {
                return this.getCost() * ( this.taxrate / 100 )
            } else {
                return 0
            }
        },
        getCost() {
            if ( this.selected && this.itemChoice ) {
                const cost = this.itemChoice[0].amount
                if (this.extras.amt) {
                    return this.extras.amt * 1
                }
                if (this.options[this.selected].date ) {
                    return this.getDays() * this.itemChoice[0].amount
                } else return cost
            } else {
                return 0
            }
        },
        getDays() {
            if (this.options[this.selected].date ) {
                return this.range.length
                //const diffTime = Math.abs(Date.parse(this.range[1]) - Date.parse(this.range[0]));
                //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                //return diffDays + 1
            } else {
                return 1
            }
        },
        getOptionTotal() {
            return ( this.getCost() + this.getSalesTax() + this.getCIF() )
        },
        getCIF() {
            if ( this.options[this.selected].cif ) {
                return this.itemChoice[0].cif
            } else return 0
        },
        getTotal() {
            return ( this.subtotal + this.getPaypalFee() )
//            if (this.options[this.selected].donation) return parseInt(this.extras.donation)
//            else return this.getCost() + this.getPaypalFee()
        },
        getSubTotal() {
            return this.subtotal
        },
        allowedDates(val) {
            return Date.parse(val) > new Date()
        },
        getOrder() {
            var items = new Array();
            for(var i in this.order) {
                items.push({ name: this.order[i].thing, 
                             unit_amount: {
                                 value: this.order[i].amount,
                                 currency_code: "USD",
                             },
                             quantity: 1,
                           })
            }
            console.log("[Payment.getOrder]: " + items)
            return items
        },
        getDesc() {
            var desc = "Order Details:\n";
            for(var i in this.order) {
                desc += this.order[i].thing + ": " + this.order[i].amount + "\n";
            }
            desc += "Subtotal  : " + this.subtotal.toFixed(2)
                 +  "PayPal Fee: " + this.getPaypalFee().toFixed(2)
                 +  "Total     : " + this.getTotal().toFixed(2)

            return desc
        },
        // Return actual state of Paypal integration.
        isPPLive() {
            return this.liveparam
        },
        // Is this running on the acutal live website.
        isLive() {
            if ( this.override ) return true
            if ( document.location.host == 'www.skyfarm.com' && document.location.pathname == '/main/' ) {
                return true
            } else return false
        },
        // return true UNLESS this is the live site running on www.skyfarm.com.  So true if preview or other dev sites.
        isPreview() {
            console.log("[Payment.isPreview]")
            if ( document.location.host == 'www.skyfarm.com' && document.location.pathname == '/main/' ) {
                return false
            } else return true
        },
        togglePaypal() {
            this.$unloadScript("https://www.paypal.com/sdk/js?client-id=" + this.paypal.id);
            if ( this.override ) {
                this.override = false;
                this.setupPaypal();
            } else {
                document.getElementById('paypal-button').innerHTML = "";
                this.alert = true;
            }
        },
        enableLive() {
            this.override = true;
            this.alert = false;
            this.setupPaypal();
        },
        setupPaypal() {
            var vm = this
            
            if ( this.isLive() ) {
                console.log("[Payment.mounted()]: PAYPAL IS LIVE");
                this.paypal.id = this.paypal.live
                this.liveparam = true
            } else {
                console.log("[Payment.mounted()]: PAYPAL IS SANDBOXED");
                this.paypal.id = this.paypal.sand
                this.liveparam = false
            }
            
            this.$loadScript("https://www.paypal.com/sdk/js?client-id=" + this.paypal.id)
                .then(() => {
                    // eslint-disable-next-line
                    paypal.Buttons({
                        
                        createOrder: function(data, actions) {
                            // This function sets up the details of the transaction, including the amount and line item details.
                            
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: vm.getTotal().toFixed(2),
                                        currency_code: "USD",
                                        breakdown: {
                                            item_total: {
                                                value: vm.getSubTotal().toFixed(2),
                                                currency_code: "USD",
                                            },
                                            handling: {
                                                value: vm.getPaypalFee().toFixed(2),
                                                currency_code: "USD",
                                            },
                                        },
                                    },
                                    description: 'Sky Farm Online Order',
                                    soft_descriptor: 'Sky Farm',
                                    items: vm.getOrder(),
                                }],
                            });
                        },
                        
                        onApprove: function(data, actions) {
                            // This function captures the funds from the transaction.
                            return actions.order.capture().then(function(details) {
                                // This function shows a transaction success message to your buyer.
                                console.log("[Payment.paypal.onApprove]: " + details)
                                vm.thanks(details);
                            });
                        }
                        
                    }).render('#paypal-button')
                })

        },
    },
    computed: {
        checkExtra() {
            var list = [];
            if(this.itemChoice) {
                for(var key in this.extrasDefaults) {
                    if(this.itemChoice[0].[key]) {
                        list.push(key)
                    }
                }
            }
            return list
        },
    },
    mounted() {
        this.setDefaults();
        this.setupPaypal();
    },

/*
        this.$loadScript("https://www.paypalobjects.com/api/checkout.js")
            .then(() => {
                paypal.Button.render({
                    env: 'sandbox',
                    client: {
                        sandbox: 'AYNl_K_60xs-14sYb7jheJRTzk7FOQDINZGhJN75ffofh4w6iHgNulgDijJcNfXTP4qzYd208iNVVb6y',
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
                                    total: vm.getTotal().toFixed(2),
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
*/
}
</script>
