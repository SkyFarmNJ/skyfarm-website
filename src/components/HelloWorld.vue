<template>
  <v-container px-md-10 fluid>
    <v-row class="text-center">

      <v-col cols="12" jusify="center" align="center">
        <v-carousel show-arrows cycle hide-delimiter-background hide-delimiters
                    :height="bheight"
          >
          <v-carousel-item
             v-for="(pic, i) in pics"
             :key=i
          >
          <v-img
            :src=pic
            width="100%"
             :height="bheight"
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
          <h1>Sky Farm Nudist Resort</h1><h2>In Basking Ridge, NJ<br>There’s Nothing Else Like It Under The Sun</h2>
          <h2>Want to enjoy the great outdoors naked? At Sky Farm, you’ve got nothing to lose but tan lines!</h2>
          <v-btn class="mt-2" color="warning" :to="{path: '/tour'}" exact >Schedule a Tour of Sky Farm!</v-btn>
      </v-col>
    </v-row>
    <v-row class="text-left">
      <v-col class="mb-2" md="8">

          <h3>Sky Farm is a members only nudist resort located on a 36-acre slice of heaven in beautiful Basking Ridge, NJ.  Here, we invite you to enjoy friends, food, drink, activities, and nature, naturally!</h3>

          <ul>
            <li
              v-for="(fact, i) in facts"
              :key=i
              v-html="fact">
            </li>
          </ul>
          <br>

          <v-row class="text-center">
            <v-col class="mb-2" md="6">
              
              <v-card class="text-left ma-3">
              <v-img
                 :src="require('../assets/Img1956_lg.jpg')"
                 contain
                 height="210"/>
              </v-card>
            </v-col>
            <v-col class="mb-2" md="6">
              
              <v-card class="text-left ma-3">
                <v-card-title>Sky Farm is the best place to be!</v-card-title>
                <v-card-text>

                  We know how amazing Sky Farm is when it comes to
                  “Happy Places!” But, don’t take our word for it!
                  We’re famous! Learn more about the best place to be
                  from {{links[0].name}}.

                  <v-btn text color="primary" @click="callLink(0)">{{links[0].title}}</v-btn>
                </v-card-text>
              </v-card>
              
            </v-col>
          </v-row>

          <v-row class="text-center">
            <v-col class="mb-2" md="6">

              <v-card class="text-left ma-3">
                <v-card-title>People Love Sky Farm</v-card-title>
                <v-card-text>
                  "My wife and I came for our visit tour yesterday and
                  instantly fell in love, we couldn't help but to become
                  members on the spot." -- Ian M., Manville, NJ.
                  <v-btn class="mt-2" color="primary" text :to="{path: '/reviews'}" exact >More Reviews and Media</v-btn>
                </v-card-text>
              </v-card>

            </v-col>
            <v-col class="mb-2" md="6">

              <v-card class="text-left ma-3">
                <v-card-title>
                  What is it like at Sky Farm?
                </v-card-title>
                <v-card-text>
                  Nude recreation is a wholesome way of life for the
                  whole family.  To help answer questions check out
                  our FAQ, or better yet schedule a tour to see for
                  yourself!
                  <v-btn class="mt-2" color="primary" text :to="{path: '/faq'}" exact >FAQ & Why Naturism</v-btn>
                </v-card-text>
              </v-card>
              
            </v-col>
          </v-row>

          <v-row class="text-center">

            <v-col class="mb-2" md="6">
              <v-card class="text-left ma-3">
                <v-card-title>
                  We Welcome New Members!
                </v-card-title>
                <v-card-text>
                  
                  Do you already know the joys of being a naturist?
                  Or, have always dreamed of skinny dipping in a
                  crystal clear pool, relaxing in a steamy hot tub and
                  hanging out with great people au naturel?
                  Either way, Sky Farm is the place for you!
                  
                </v-card-text>
                <v-card-text class="text-center">
                  <v-btn class="mt-2" color="warning" :to="{path: '/tour'}" exact >Schedule a Tour of Sky Farm!</v-btn>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col class="mb-2" md="6">
              <v-card class="text-center ma-3" height="265">
              <v-img
                 :src="require('../assets/couple2final.jpg')"
                 contain
                 height="220"/>
              </v-card>
            </v-col>

          </v-row>

          
      </v-col>
      <v-col md="4">
        <v-card class="text-left ma-3">
          <v-card-title style="word-break: normal;">
            What's Nude @ The Farm
          </v-card-title>
          <v-card-text>
            <Timeline id="skyfarmnews" sourceType="profile" :options="{ chrome: 'noborders nofooter', tweetLimit: '5' }"/>
            <hr>
          </v-card-text>
          <v-card-title style="word-break: normal;">
            Be sure to visit us on our Social Media accounts!
          </v-card-title>
          <v-card-text>

            Visit us on our social media pages!  There is lots of
            helpful information there and we would love to see you
            there.  Look for <b>@SkyFarmNJ</b>:

          </v-card-text>
          <v-card-text class="text-center">
            <v-btn
               v-for="(x, i) in socials"
               :key=i
               icon x-large
               @click="callSocial(i)"
               >
              <v-icon x-large >mdi-{{x.icon}}</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
        </v-col>

    </v-row>
    <v-row class="text-center">
      <v-col cols="12" align="center" justify="center">
        <v-img
          :src="require('../assets/banner.jpg')"
        :height="bheight"
        width="90%"
          />
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { Timeline } from 'vue-tweet-embed/dist'

export default {
    components: {Timeline},
    data: () => {
        return {
            name: 'HelloWorld',
            bheight: 150,
            facts: [
                "Sky Farm is a membership community. Day passes are not available.",
                "Unlike Gunnison, at Sky Farm there are no long walks to paradise!",
                "Enjoy our pristine pool, relaxing hot tub and soothing sauna.",
                "Get involved! Our calendar of events has something for everyone!<ul><li>Volleyball, Tennis, Nude Yoga, Pétanque, Themed Dinners, Pool Parties & More!</li></ul>",
                "<b>Facilities Include:</b>  Heated Pool, Hot Tub, Sauna, Kids Playground, Tent Camping, <br>Free WIFI, Lodge rooms, Clubhouse, Large Sun Lawns, Nature Trails and so much more.",
                "Relax as you enjoy cold beverages and make new friends.",
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
            ],
            links: [
                { title: "Naked in America",
                  name: 'The Meandering Naturist',
                  url:  'https://meanderingnaturist.com/2020/08/23/naked-in-america-sky-farm-new-jersey/',
                },
            ],
            socials: [
                {url: "https://www.facebook.com/skyfarmnj", icon: "facebook", title: "Facebook", id: "SkyFarmNJ" },
                {url: "https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fwww.skyfarm.com%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=SkyFarmNJ&tw_p=followbutton", icon: "twitter", title: "Twitter", id: '@SkyFarmNJ' },
                { url: "https://www.instagram.com/skyfarmnj", icon: "instagram", title: "Instagram", id: "SkyFarmNJ" },
            ]
        }
    },
    methods: {
        callLink(i) {
            this.$gtag.event('linkto', { event_label: this.links[i].title });
            window.open(this.links[i].url, '_blank')
        },
        callSocial(i) {
            this.$gtag.event('linkto', { event_label: this.socials[i].title });
            window.open(this.socials[i].url, '_blank')
        }
    },
    mounted() {
        this.$gtag.pageview({ page_path: this.$route.path, page_title: 'Site Home'})
        if ( this.$vuetify.breakpoint.mdAndUp ) this.bheight = 350;
    },
}
</script>
