<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>What Happens Next</h2>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col cols="12" mb-5>

        <p>Your tour request has been sent to our Membership team for review.  Soon after you will be contacted via phone or email to schedule your tour.</p>

        <h3>What to Expect</h3>
        <p>Upon arrival a membership committee representative will meet you at the gate.  They will acquaint you with the rules of Sky Farm, show you around the grounds, introduce you to other members and answer any questions you may have.</p>

        <h3>What should I bring?</h3>
        <p>Towels, ID, sunscreen, shoes, snacks and anything else you need to feel comfortable.<p>

        <h3>So what is next?</h3>
        <p>Relax and wait for an email or phone call.  Also check out our FAQ page for more information.</p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
      data: () => ({
          pics: [
              require('../assets/20190704_115037-1.jpg'),
              require('../assets/Img1956_lg.jpg'),
              require('../assets/20190704_114909.jpg')
          ]
      })
  }
</script>
