<template>
  <v-container px-10 fluid>
    <v-row class="text-center">

      <v-col cols="12" jusify="center" align="center">
        <v-carousel show-arrows cycle hide-delimiter-background 
                    height="425"
          >
          <v-carousel-item
             v-for="(pic, i) in pics"
             :key=i
          >
          <v-img
            :src=pic
            height="425"
            width="90%"
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

<!--
"require('../assets/banner4.jpg')"
-->

    <v-row class="text-center">
      <v-col class="mb-2" cols="12">
          <h1>Sky Farm Nudist Resort In Basking Ridge, NJ <br/> There’s Nothing Else Like It Under The Sun</h1>
          <h2>Want to enjoy the great outdoors naked? At Sky Farm, you’ve got nothing to lose but tan lines!</h2>
          <v-btn :to="{path: '/tour'}" exact >Schedule a Tour of Sky Farm!</v-btn>
      </v-col>
    </v-row>
    <v-row class="text-left">
      <v-col class="mb-2" cols="12">

          <h3>Sky Farm is a members only nudist resort located on a 36-acre slice of heaven in beautiful Basking Ridge, NJ.  Here, we invite you to enjoy friends, food, drink, activities, and nature, naturally!</h3>

          <h3>We know how amazing Sky Farm is when it comes to “Happy Places!” But, don’t take our word for it! We’re famous! Learn more about the best place to be <a href="https://meanderingnaturist.com/2020/08/23/naked-in-america-sky-farm-new-jersey/">“Naked in America.”</a></h3>

          <ul>
            <li
              v-for="(fact, i) in facts"
              :key=i
              >
              {{fact}}
            </li>
          </ul>
      </v-col>

      <v-divider/>

    </v-row>
    <v-row class="text-center">

      <v-col cols="12" align="center" justify="center">
        <v-img
          :src="require('../assets/banner.jpg')"
        height="400"
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
            ],
            pics: [
                require('../assets/banner4.jpg'),
                require('../assets/SkyFarm800.png'),
                require('../assets/SkyFarm801.png'),
                require('../assets/SkyFarm802.png'),
                require('../assets/SkyFarm803.png'),
                require('../assets/SkyFarm804.png')
            ]
        }
    }
}
</script>
