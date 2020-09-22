<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Sky Farm FAQ</h2>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col cols="12" mb-5>
        <h3>Sky Farm Frequently Asked Questions</h3>

            <p>When you come for a tour of Sky Farm, our knowledgeable member guides will be happy to answer all your questions! We want you to feel at home here. But, for those who are very curious, here are some answers to popular FAQs.</p>

<h3>What’s a naturist?</h3>
<p>1. A person who goes naked in designated areas; a nudist.<br>
2. A person who loves Sky Farm.</p>
 
<h3>Can I buy a day pass?</h3>

<p>NO! We do not offer day passes at Sky Farm. We are a members-only resort.</p>

<p>Members are allowed to invite guests on a limited basis.</p>
 
<h3>Do I have to be nude everywhere, at all times, at Sky Farm?</h3>

<p>The only places people are required to disrobe are in the pool and hot tub. Elsewhere on the farm, clothing is optional. Obviously, however, naturists will do what naturists do!</p>

<h3>What’s involved in a Sky Farm tour?</h3>

<p>We will welcome you at the gate and take you on a golf-cart tour of Sky Farm’s luscious grounds. You’ll visit the pool and hot tub, see our immaculate bathroom/shower facilities, check out the clubhouse including kitchen and lounge area and more. No doubt, you’ll be greeted by countless “Sky Farmers” who will be happy to share their love of this amazing place.</p>

<h3>Is Sky Farm a time-share facility?</h3>

<p>Sky Farm is a membership co-op. Once granted membership, you pay an annual fee (discussed during your tour) and then Sky Farm will be your home-away-from home! (Day passes are not available!) Come when you can and enjoy! The farm is open 24/7/365 but the pool and hot tub are only in use from May-October.</p>

<h3>What does Sky Farm membership cost?</h3> 

<p>There are resident membership fees (people who live 50 miles from Sky Farm) and non-resident membership fees. Costs, as well as details about probationary membership, will all be explained on the tour.</p>

<h3>What is there to do at Sky Farm?</h3>

<p>You mean besides the gorgeous pool, hot tub, and sauna? Play petanque, volleyball, shuffleboard, eat, drink, socialize and more! Plus, check out our Calendar of Events!</p>

<h3>How can we join Sky Farm?</h3>

<p>GREAT QUESTION! Start with a tour and check us out. We’ll answer all your questions and invite you to spend the day at the pool enjoying our beautiful facilities. When available, lunch will be provided for you. We can’t wait to meet you!</p>

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
      }),
    mounted() {
        this.$ga.page('/faq')
    },
  }
</script>
