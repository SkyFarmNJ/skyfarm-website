<template>
  <v-container fluid>
    <v-row class="text-center">

      <v-col>
        <v-img
          :src="require('../assets/banner4.jpg')"
         />
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
        >
        <v-row justify="center">
          <h1>Sky Farm Nudist Resort In Basking Ridge, NJ — There’s Nothing Else Like It Under The Sun</h1>
          <h2>Want to enjoy the great outdoors naked? At Sky Farm, you’ve got nothing to lose but tan lines!</h2>
        </v-row>

        <v-row justify="center" pt-16>
          <v-btn large>Schedule a Tour!</v-btn>
          <h3>Sky Farm is a members only nudist resort located on a 36-acre slice of heaven in beautiful Basking Ridge, NJ.  Here, we invite you to enjoy friends, food, drink, activities, and nature, naturally!</h3>
        </v-row>

        <v-row justify="center">
          <ul>
            <li
              v-for="(fact, i) in facts"
              :key=i
              >
              {{fact}}
            </li>
          </ul>
        </v-row>
      </v-col>

      <v-col>
        <v-img
          :src="require('../assets/banner.jpg')"
          />
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'HelloWorld',


    facts: [
        "Sky Farm is a membership community. Day passes are not available.",
        "Unlike Gunnison, at Sky Farm there are no long walks to paradise!",
        "Enjoy our pristine pool, relaxing hot tub and soothing sauna.",
        "Get involved! Our calendar of events has something for everyone!",
        "Relax as you enjoy adult beverages and make new friends.",
        "Sky Farm is open 24/7 May to October.",
        "BBQ lunch is available for purchase most weekends during the season."
    ]

}
</script>
