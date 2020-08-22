<template>
  <v-container px-10 fluid>
    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Get To Know Sky Farm's Rich History</h2>
      </v-col>
      <v-col cols="12" mb-5>
        <P>Originally founded as the American League for Physical Culture, what we know now as Sky Farm began in 1929 at a meeting in the Café Michelob on 28th Street in New York City. The first brochure issued by the League proclaimed on the cover: “An Invitation to Come Into the Sunlight.”</p>

<P>Sky Farm bears the distinction of being the first nudist group in the United States to operate continuously in the same location.</p>

<P>The first organized events of indoor exercising and swimming took place in a rented gymnasium in New York City, leading to the arrest and subsequent acquittal of our founding members in 1931. While continuing to rent the gymnasium during the winter, the founders also rented properties in Spring Valley, NY, and later in Ironia, NJ, before purchasing the property for Sky Farm in Liberty Corner, NJ, and in 1932 for $3,440.</p>

<P>Since acquiring the property in 1932, Sky Farm has functioned as a member-owned cooperative. Located on the property are approximately 60 cottages which mostly began as tent platforms from the ‘30s and ‘40s. A dormitory (now known as Sky Farm Lodge) provided overnight accommodations for members who traveled mostly by train to the Farm. Today, the lodge rooms are available to members for rent.</p>
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

      <v-col cols="12" mb-5>
<P>Back in the 1930s, meals were prepared and served by Leni and Bill Meyer for $1 a day in what is now the kitchen portion of our Clubhouse. The Meyers bought locally produced provisions, such as milk, ice and chickens, to develop personal business relationships with merchants. And remember – there was no electricity on the Farm in those days.</p>

<P>One of the first projects to be undertaken was the hand-digging of the original pool in 1933, which was fed from the onsite creek. Over the years, a wide variety of improvements have been added – the Recreation Hall, a heated swimming pool, miniten and petanque courts, nature trails, hot tub spa and sauna.</p>

<P>The Sky Farm Historical Society was formed in the mid-90s to preserve various documents, photographs and memorabilia that outline the development of our organization.</p>

<P>Sky Farm is open 365 days a year. Besides enjoying the facilities during the warm weather, many members come out during the winter months to walk around the property, use the sauna and enjoy the tranquility that our setting provides. In recent years, Sky Farm’s packed calendar of events and activities has expanded to include Halloween parties, holiday gatherings and mid-winter meetups!</p>
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
      })
  }
</script>
