<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Sky Farm FAQ</h2>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col lg="8" mb-5>
        <h3>Sky Farm Frequently Asked Questions</h3>
        <hr>

            <p>When you come for a tour of Sky Farm, our knowledgeable member guides will be happy to answer all your questions! We want you to feel at home here. But, for those who are very curious, here are some answers to popular FAQs.</p>

        <v-card
           class="text-left ma-3"
           flat
           v-for="(opt, i) in items"
           :key=i
           >
          <v-card-title style="word-break: normal;">
            {{opt.quest}}
          </v-card-title>
          <v-card-text v-html="opt.ans">
          </v-card-text>
          <hr>
        </v-card>

      </v-col>

      <v-col lg="4" mb-5>
        <h3>Why Naturism?</h3>
	<hr>
        <v-card
           class="text-left ma-3"
           v-for="(opt, i) in why"
           :key=i
           >
          <v-card-title style="word-break: normal;">
            {{opt.title}}
          </v-card-title>

          <v-card-text class="text--primary">
            {{opt.intro}}
          </v-card-text>
          <v-card-actions>
            Read More at 
            <v-btn text color="primary" @click="callLink(i)">{{opt.name}}</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12" mb-5 class="text-center">
        <v-btn color="warning" :to="{path: '/tour'}" exact >Schedule a private tour!</v-btn>
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
        ],
        items: [
            { quest: 'What is a naturist?',
              ans  : '1. A person who goes naked in designated areas; a nudist.<br>2. A person who loves Sky Farm.',
            },
            { quest: 'Can I buy a day pass?',
              ans:   'NO. We do not offer day passes at Sky Farm. We are a members-only resort.<br>However, members are allowed to invite guests on a limited basis.',
            },
            { quest: 'Do I have to be nude everywhere, at all times, at Sky Farm?',
              ans:   'The only places people are required to disrobe are in the pool and hot tub. Elsewhere on the farm, clothing is optional. Obviously, however, naturists will do what naturists do!',
            },
            { quest: 'Is Sky Farm family friendly?',
              ans:   'Absolutely!  Many of our members have raised children here. Children are natural nudists, they love the freedom and Sky Farm is a safe place for the entire family.',
            },
            { quest: 'What\'s involved in a Sky Farm tour?',
              ans:   'We will welcome you at the gate and take you on a golf-cart tour of Sky Farm’s luscious grounds. You’ll visit the pool and hot tub, see our immaculate bathroom/shower facilities, check out the clubhouse including kitchen and lounge area and more. No doubt, you’ll be greeted by countless “Sky Farmers” who will be happy to share their love of this amazing place.',
            },
            { quest: 'Is Sky Farm a time-share facility?',
              ans:   'Sky Farm is a membership co-op. Once granted membership, you pay an annual fee (discussed during your tour) and then Sky Farm will be your home-away-from home! (Day passes are not available!) Come when you can and enjoy! The farm is open 24/7/365 but the pool and hot tub are only in use from May-October.',
            },
            { quest: 'What does Sky Farm membership cost?',
              ans:   'There are resident membership fees (people who live 50 miles from Sky Farm) and non-resident membership fees. Costs, as well as details about probationary membership, will all be explained on the tour.',
            },
            { quest: 'What is there to do at Sky Farm?',
              ans:   'You mean besides the gorgeous pool, hot tub, and sauna? Play petanque, volleyball, shuffleboard, eat, drink, socialize and more! Plus, check out our Calendar of Events!',
            },
            { quest: 'How can we join Sky Farm?',
              ans:   'GREAT QUESTION! Start with a tour and check us out. We’ll answer all your questions and invite you to spend the day at the pool enjoying our beautiful facilities. When available, lunch will be provided for you. We can’t wait to meet you!',
            },
/*
            { quest: '',
              ans:   '',
            },
*/
        ],
	why: [
            { title: 'Nude Recreation From A Woman\'s Perspective',
              name:  'AANR',
              intro: 'One of the healthiest things I did for myself was to try nude recreation. I quickly learned that being nude is actually quite natural, what you might call a life enhancing experience.',
              link:  'https://www.aanr.com/from-a-womans-perspective',
            },
            { title: 'Naturism - Wikipedia',
              name:  'Wikipedia',
              intro: 'Naturism is a lifestyle of non-sexual nudity, and the cultural movement which advocates and defends that lifestyle.',
              link:  'https://en.wikipedia.org/wiki/Naturism',
            },
            { title: 'Why be naked? Nudists explain the joys of being bare',
              name:  'Oregon Live',
              intro: 'Hawkins had seen nudity like many American still see it today - as something to do in the privacy of your home, certainly not around other people and definitely not in public - but today she\'s a full-blown nudist, working full-time to promote the joys of nudity.',
              link:  'https://www.oregonlive.com/entertainment/2015/06/why_be_naked.html',
            },
            { title: '10 Questions You Always Wanted to Ask a Naturist',
              name:  'VICE',
              intro: 'Ever wondered what it would be like to be naked all the time?',
              link:  'https://www.vice.com/en_asia/article/9ky9b7/10-questions-you-always-wanted-to-ask-a-naturist',
            },
/*
            { title: '',
              name:  '',
              intro: '',
              link:  '',
            },
*/
	],
    }),
    methods: {
        callLink(i) {
            this.$gtag.event('linkto', { event_label: this.why[i].title });
            window.open(this.why[i].link, '_blank')
        }
    },
    mounted() {
        this.$gtag.pageview({ page_path: this.$route.path, page_title: 'FAQ'})
    },
}
</script>
