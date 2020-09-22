<template>
  <v-container px-10 fluid>
    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <v-btn :to="{path: '/tour'}" exact >Schedule a private tour of Sky Farm!</v-btn>
      </v-col>
      <v-col cols="12">
        <h2>Sky Farm Welcomes New Members!</h2>
        <p>Do you already know the joys of being a naturist? Or, have always dreamed of skinny dipping in a crystal clear pool, relaxing in a steamy hot tub and hanging out with great people au naturel? </p>
        <p>Either way, Sky Farm is the place for you!</p>
        <ul class="mb-6">
          <li><b>Relax!</b> Sky Farm is a family-friendly nudist membership resort. Be yourself — in your birthday suit! </li>
          <li><b>Get involved!</b> There are tons of activities: 24/7 access to pool, hot tub & sauna, sports and games,  parties and dances, dinners and special events like Friendsgiving, Halloween Party, Pub & Poker Nights…. The list goes on and on.</li>
          <li>Enjoy Sky Farm’s beautiful grounds, lodge, clubhouse, immaculate bathrooms and showers and more!</li>
        </ul>
        <p>The Sky Farm community is a member-owned cooperative with approximately 60 residential cabins. Our gorgeous pool and invigorating hot tub are enjoyed by members 24/7 from May to October.</p>
        <p>You must be a member to use Sky Farm’s beautiful facilities. We do not offer day passes.</p>
        <p>With a full calendar of events from pub nights and potlucks to karaoke and DJ-dances to poker nights to sports galore, there is truly something for everyone at Sky Farm.</p>
        <p>Note: Memberships are limited and everyone is probationary for a minimum of one year. Sky Farm strive for a balance between couples and singles as well as males and females, so there can sometimes be a waiting list.</p>
      </v-col>

      <v-col cols="4"
             mb-5
             v-for="(pic, i) in pics"
             :key=i>
        <v-img
          :src=pic
          contain
          height="200"/>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
  export default {
      data: () => ({
          pics: [
              require('../assets/streetsignfinal.jpg'),
              require('../assets/hottubweb.jpg'),
              require('../assets/couple2final.jpg')
          ]
      }),
    mounted() {
        this.$ga.page('/membership')
    },
  }
</script>
