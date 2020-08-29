<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col lg="9" mb-5 class="text-left">
        <h2>Club News</h2>
        <hr>

        <h3>2020-2021 Board of Governors Nominees</h3>

<P>The Nominating Committee thanks everyone who applied for a position on the Board of Governors for their initiative and dedication to Sky Farm. We are pleased to present our slate of candidates for the Sky Farm Board of Governors for the 2020-2021 season:</p>

<ul>
<li>Michael D- President</li>
<li>Anthony M- Vice President</li>
<li>Erica F- Secretary</li>
<li>Mary B- Treasurer</li>
<li>Allison S - Financial Secretary</li>
<li>Bill D- Financial Chairperson</li>
<li>Jeannette W - Membership Chairperson</li>
<li>Josh H - Trustee</li>
</ul>
<P>Additional candidates may be nominated by petition. See Sky Farm Bylaws, Article VI, Section 6 for details.</P>

<P>Your Sky Farm Nominating Committee;<br>
Dan S.- Chair, Allison M., Judy S., Kate S.,  Bob L. </p>



      </v-col>
      <v-col  mb-5 class="text-center">
        <v-card>
          <v-card-title>
            COVID Notices
          </v-card-title>
          <v-card-subtitle class="text-left">
            Keeping The Farm Safe
          </v-card-subtitle>
          <v-card-text class="text-left">
            <v-btn
               color="error"
               to='/members/archive/docs/Sky Farm Covid 19 Guidelines v2_6.pdf'
               >
              Camp Rules
            </v-btn><br>
            <v-btn
               color="error"
               class="mt-2"
               to='/members/archive/docs/Sky Farm Covid 19 Pool & Spa Guidelines v1.1.pdf'
               >
              Pool Rules
            </v-btn>

          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            Camp Documents
          </v-card-title>
          <v-card-subtitle class="text-left">
            Knowning the rules
          </v-card-subtitle>
          <v-card-text class="text-left">
            <v-btn
               to='/members/archive/docs/Camp Rules September 2019.pdf'
               >
              Camp Rules
            </v-btn><br>
            <v-btn
               class="mt-2"
               to='/members/archive/docs/Bylaws-7-14-19-Word.pdf'
               >
              Sky Farm Bylaws
            </v-btn>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>



  </v-container>
</template>

<script>

export default {
    data: () => ({
    })
}
</script>
