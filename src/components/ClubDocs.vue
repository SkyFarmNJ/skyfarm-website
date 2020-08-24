<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Club Documents</h2>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col cols="12" mb-5>

        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in docs" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.desc }}</td>
		<td>View / Download</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
      data: () => ({
          docs: [
              { name: 'COVID Camp Rules',
                desc: 'Sky Farm Member COVID-19 Guidelines V2.6 June 25, 2020' },
              { name: 'COVID Pool Rules',
                desc: 'Sky Farm Member Pool & Spa COVID-19 Guidelines V1.1 June 22, 2020'},
              { name: 'Camp Rules',
                desc: 'Rules for Sky Members as of November 2019'},
              { name: 'Sky Farm Bylaws',
                desc: 'Statement of Purpose and Articles goverening the operation of Sky Farm as of July 2019'},
              { name: 'Lodge Rental Information',
                desc: 'Guidelines for The Sky Farm Lodge and Chalet for daily and seasonal rentals.'},
              { name: 'Nominating Committee Handbook',
                desc: 'Guidlines for the Nominating Committee which convenes every hear in July to propose a slate of new BOG members.'},
              { name: 'Site License 2016',
                desc: 'For cabin owners, this is the latest version of the site licnese agreement.'},
              { name: 'Cabin Bill of Sale',
                desc: 'When buying or selling a cabin this form documents the transfer of ownership.'},
              { name: 'Do Not Admit List',
                desc: 'List of former members who have left not in good standing and are not to be readmitted.'},
          ]
      })
}
</script>
