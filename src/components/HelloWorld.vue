<template>
  <v-container fluid>
    <v-row class="text-center">

      <v-col cols="12" jusify="center" align="center">
        <v-img
          :src="require('../assets/banner4.jpg')"
	   height="450"
	   width="90%"
         />
      </v-col>
    </v-row>
    
    <v-row class="text-center">
      <v-col/>
      <v-col
        class="mb-5"
        cols="11"
        >
        <v-row justify="center">
          <h1>Sky Farm Nudist Resort In Basking Ridge, NJ <br/> There’s Nothing Else Like It Under The Sun</h1>
        </v-row>
        <v-row justify="center">
          <h2>Want to enjoy the great outdoors naked? At Sky Farm, you’ve got nothing to lose but tan lines!</h2>
        </v-row>

        <v-row justify="center">
          <h3>Sky Farm is a members only nudist resort located on a 36-acre slice of heaven in beautiful Basking Ridge, NJ.  Here, we invite you to enjoy friends, food, drink, activities, and nature, naturally!</h3>
        </v-row>
        <v-row justify="center" pt-16>
          <v-btn large>Schedule a Tour!</v-btn>
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
      <v-col/>

      <v-divider/>

    </v-row>
    <v-row class="text-center">

      <v-col cols="12" align="center" justify="center">
        <v-img
          :src="require('../assets/banner.jpg')"
	   height="450"
	   width="90%"
          />
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => {
        return {
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
    }
}
</script>
