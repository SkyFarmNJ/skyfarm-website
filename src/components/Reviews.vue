<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Reviews & Media</h2>
      </v-col>
    </v-row>

     <v-row>
      <v-col lg="8">
        <h3>Sky Farm in the News</h3>
        <hr>
        <v-card
           class="text-left ma-3"
           flat
           v-for="(opt, i) in stories"
           :key=i
           >
          <v-card-title>
            {{opt.title}}
          </v-card-title>
          <v-card-subtitle>
            <v-btn text color="primary" @click="callLink(i)">{{opt.name}}</v-btn>
          </v-card-subtitle>
          <v-card-text>
            {{opt.intro}}
          </v-card-text>
          <v-card-actions>
            Read More at 
            <v-btn text color="primary" @click="callLink(i)">{{opt.name}}</v-btn>
          </v-card-actions>
          <hr>
        </v-card>
	
      </v-col>
      <v-col lg="4" mb-5>
        <h3>Testimonials</h3>
	<hr>
        <v-card
           class="text-left ma-3"
           v-for="(opt, i) in reviews"
           :key=i
           >
          <v-card-text class="text--primary">
            {{opt.text}}
          </v-card-text>
          <v-card-actions>
            {{opt.author}}
          </v-card-actions>
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
          ],
          stories: [
              { title: 'SKY FARM: A Living, Breathing part of America Nudist History',
                link: 'https://meanderingnaturist.com/2020/08/23/naked-in-america-sky-farm-new-jersey/',
                name: 'THE MEANDERING NATURIST',
                intro: 'By the end of the day, my wife gave the place highest honors, “If we were going to join a club, I think this would be the place!”'
              },
              { title: 'The Sky Farm Nudist Club - Youtube Video',
                link:  'https://www.youtube.com/watch?v=FADzlwCLlDw',
                name:  'NJ.com on Youtube',
                intro: 'In the 1930s, a group of pioneering nudist enthusiasts purchased a property in the remote Watchung Mountains of central New Jersey. More than 75 years later, they\'re still there, tucked away in what is now the affluent suburban enclave of Bernards Township.'
              },
              { title: 'Review Resorts: Sky Farm Nudist Resort',
                link:  'https://www.reviewresorts.com/resorts/clothing-optional/sky-farm-nudist-resort-new-jersey/',
                name:  'Review Resorts',
                intro: 'Sky Farm is a safe, family-friendly environment where nude recreation can be enjoyed by people of all ages. Located on 35 acres in central New Jersey. Sky Farm has a large heated pool (open May thru Sept), a hot tub (open Apr thru Nov), sauna, clubhouse, and community kitchen.'
              },
              { title: 'Sky Farm, a \'big naked family,\' celebrates its 85th year',
                link:  'https://www.mycentraljersey.com/story/news/local/somerset-county/2017/08/11/sky-farm-big-naked-family-celebrates-its-85th-year/540744001/',
                name:  'My Central Jersey',
                intro: 'Sky Farm is a family-friendly nudist club, and there are several amenities available to children, including a playground with a slide and swings as well as basketball courts.'
              },
              { title: 'Sky Farm – The Oldest Clothing-Optional Retreat in the United States Right Here in Liberty Corner',
                link:  'https://www.mrlocalhistory.org/skyfarm/',
                name:  'Mr. Local History Project',
                intro: 'In 1932, the American League for Physical Culture (ALPC), under the guidance of Kurt Barthel, set up a little-known community in the Liberty Corner section of Basking Ridge. A “summer camp” for families, local residents and those from nearby states spent their summers at ALPC with the mothers and children residing there full-time, and the husbands arriving by train from New York City on weekends.',
              },
              { title: 'N.J. named nation\'s No. 1 state for nakedness',
                link:  'https://www.nj.com/entertainment/2015/08/nj_named_nations_number_one_state_for_nakedness.html',
                name:  'NJ.com',
                intro: 'Sky Farm in Bernards, open since 1932,  is the nation\'s oldest naturist community. It was originally founded as the American League for Physical Culture; an early League brochure advertised "An Invitation to Come into the Sunlight."'
              },
              { title: 'Ready, set, get naked: Clubs prepare for World Record Skinny-Dip attempt',
                link:  'https://www.nj.com/somerset/2013/07/ready_set_get_naked_clubs_prepare_for_world_record_skinny_dip_attempt.html',
                name:  'NJ.com',
                intro: 'Nudist clubs across North America are dusting off their birthday suits this weekend to attempt to beat a 2010 Guinness World Record set for the largest number of naked people in the water at the same time.'
              },
              { title: 'Kurt Barthel - the father of the modern United States nudist movement.',
                link:  'https://en.wikipedia.org/wiki/Kurt_Barthel',
                name:  'Wikipedia',
                intro: 'He began the American League for Physical Culture in 1929 with an ad, first in the leading German nudist magazines published in Berlin by Robert Laurer "Lichtland" (Light Land) and "Lachendes Leben" (Laughing Life), then later in a newspaper seeking like-minded folks. The first organized nudist outing was held on Labor Day 1929. There were seven people in attendance, three women and four men, all but one between the ages of 20 and 27.'
              },
              { title: 'JERSEY; Taking Off on a Field Trip',
                link:  'https://www.nytimes.com/2002/07/14/nyregion/jersey-taking-off-on-a-field-trip.html',
                name:  'The New York Times',
                intro: 'FOR some of us, the perfect bathing suit is the Holy Grail. Lycra origami to tuck, hide, slim and otherwise morph the average suburban blob into a bodacious bod -- or, better yet, to make it disappear altogether.  And then, for others, the perfect bathing suit is their birthday suit.  I\'m talking nudists. Naked people in New Jersey.'
              },
/*
              { title: '',
                link:  '',
                name:  '',
                intro: ''
              },
*/

          ]
      }),
    methods: {
        callLink(i) {
            this.$gtag.event('linkto', { event_label: this.stories[i].title });
            window.open(this.stories[i].link, '_blank')
        }
    },
    mounted() {
        this.$gtag.pageview({ page_path: this.$route.path, page_title: 'Reviews'})
    },
  }
</script>
