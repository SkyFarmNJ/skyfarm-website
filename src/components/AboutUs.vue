<template>
  <v-container px-10 fluid>
    <v-row class="text-center">
      <v-col cols="12" mb-5>
        <v-btn color="warning" :to="{path: '/tour'}" exact >Schedule a private tour!</v-btn>      </v-col>
      <v-col cols="12" mb-5>
        <h1>About Us</h1>
        <h2>Sky Farm is New Jersey's best kept secret!</h2>
        <p class="ma-10">Sky Farm is America’s oldest naturist recreational community. Sitting on 36 acres of lush trees and woods at the base of the Watchung Mountains in Basking Ridge, New Jersey, individuals, couples and families have been enjoying nature naturally here since 1932.</p>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col md="4" mb-5>
        <v-img
          src="../assets/2019.jpg"
          contain
          height="200"/>
      </v-col>
      <v-col md="4" mb-5>
        <p>Got questions? We have answers.</p>
        <v-btn class="mb-3" color="primary" :to="{path: '/faq'}"     exact >Check out our FAQ!</v-btn><br>
        <v-btn class="mb-3" color="primary" :to="{path: '/history'}" exact >Learn more about Sky Farm!</v-btn>
        <p>
</P>

      </v-col>
      <v-col md="4" mb-5>
        <v-img
          src="../assets/couple2final.jpg"
          contain
          height="200"/>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col cols="12" mb-5>
        <h3>But wait! There's more!</h3>
        <ul>
        <li>At Sky Farm, responsible drinking of adult beverages is permitted. (No glass at the pool or hot tub!) Fill your cup or cooler at the ice machine!</li>
        <li>Our clubhouse has a full kitchen and event space — perfect for weekend lunches and super-fun events all season long!</li>
        <li>Check out Sky Farm’s calendar of events! You’ll find countless recreational activities including swimming, petanque, shuffleboard, pop tennis, volleyball and much more. The clubhouse, open 24/7 to members, has a pool table, poker table, foosball, dart board, a Big Screen TV and free WiFi.</li>
        <li>Looking for more serene activities? Take a long walk through the lush greens, settle in with a good book from our library or get your hands dirty in our community vegetable garden.</li>
        <li>Keep your chairs and umbrellas onsite, near the pool — no hassles here!</li>
        <li>Hygiene is a top priority at Sky Farm. Showers are required before using the pool, hot tub or sauna.  Everyone brings their own towels to sit on.</li>
        <li>Lodge rooms and tent sites available for members to rent at nominal rates</li>
        <li>Families are welcome here!  Kids are natural nudists and love to be free.  And while this is a very safe place for kids parents should always keep an eye on them.</li>
        <li>Sky Farm is an AANR-affiliated facility and members can join AANR through Sky Farm.</li>
        </ul>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        pics: [
            require('../assets/2019.jpg'),
            require('../assets/hottubweb.jpg'),
            require('../assets/couple2final.jpg')
        ]
    }),
    mounted() {
        this.$gtag.pageview({ page_path: this.$route.path, page_title: 'About Us'})    
    },
}
</script>
