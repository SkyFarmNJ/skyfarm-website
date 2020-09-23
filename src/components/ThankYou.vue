<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Thank You!</h2>
        {{details.status}}
        
        <v-card
           class="mx-auto"
           max-width="500"
           >
          <v-card-text class="text-left">
            <h3>Order Summary</h3>
            <p>&nbsp;</p>
            <v-data-table
               :headers="headers"
               :items="details.purchase_units[0].items"
               class="elevation-1"
               dense
               hide-default-header
               hide-default-footer
               calculate-widths
               >
              <template v-slot:item.amount="{ item }">
                <span>${{item.unit_amount.value}}</span>
              </template>
            </v-data-table>
            <hr>
            <v-simple-table dense class="pl-lg-15">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td align="right">${{details.purchase_units[0].amount.breakdown.item_total.value}}</td>
                  </tr>
                  <tr>
                    <td>PayPal Fees:</td>
                    <td align="right">${{details.purchase_units[0].amount.breakdown.handling.value}}</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td align="right">${{details.purchase_units[0].amount.value}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <hr>
            <p>
              Thank you for using the Sky Farm online payment system.
              If you have any questions or need to talk to someone
              about this transation, send an email to:
              <a href="mailto:financialsecretary@skyfarm.com">financialsecretary@skyfarm.com</a> .
            </p>
            <p>
              For a copy of this transaction print a copy of this page. You may also
              check your PayPal account or your payment provider.
            </p>
            <p>ID: {{details.id}}<br>
               Date: {{details.create_time}}</p>
          </v-card-text>
        </v-card>
        
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  props: {
      details: {
          type: Object,
      }
  },
  data: () => ({
      details: {},
      headers: [
          { text: "Item", value: "name"     },
          { text: "Amount", value: "amount", align: "end"  },
      ],
  }),
  methods: {
  },
  mounted() {
      this.details = this.$route.params.details;
      this.$gtag.event('purchase')
      this.$gtag.pageview({ page_path: this.$route.path, page_title: 'Payment Thank You'})
  }
}
</script>
