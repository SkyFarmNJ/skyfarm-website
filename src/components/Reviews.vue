<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Testimonials</h2>
      </v-col>
    </v-row>

    <v-row 
       class="text-left"
       v-for="(opt, i) in reviews"
       :key=i
       >
      <v-col cols="12" mb-5>
        <v-card>
          <p>{{opt.text}}<br><b>{{opt.author}}</b></p>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
      data: () => ({
          reviews: [
              { author: "Allison S, Morristown",
                text:   "Sky Farm has so much to offer - even beyond our friendly members and crystal clear pool.  If you like being outside in nature, like I do - then I bet you'd love it here - like I do." },
              { author: "Marjie W., Weehawken",
                text:   "As a nudist for most of my adult life, I was used to getting up early and driving and walking and walking some more to get to Gunnison Beach on nice weekend days.  I heard about Skyfarm from a friend five years ago and I only wish I had joined sooner!"},
              { author: "Ian M., Manville, NJ.",
                text: "My wife and I came for our visit tour yesterday and instantly fell in love, we couldn't help but to become members on the spot. Everyone was so friendly and welcoming and we feel like family already. The grounds are beautiful the pool is amazing and there is always something going on. Sky farm has an awesome atmosphere of relaxation and happiness."},
              { author: "Bruce D., Bedminster",
                text: "My wife and I had been going to Gunnison Beach to get our tans lines erased, but then heard about Sky Farm. We signed up the Memorial day Saturday we visited 8 years ago and have not been back to Gunnison since!  And we have No Tan Lines to erase!"}
          ]
      }),
    mounted() {
        this.$gtag.pageview({ page_path: this.$route.path, page_title: 'Reviews'})
    },
  }
</script>
