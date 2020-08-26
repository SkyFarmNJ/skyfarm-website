<template>
  <v-container px-10 fluid>

    <v-row class="text-left">
      <v-col cols="12" mb-5 class="text-center">
        <h2>Schedule A Tour</h2>
      </v-col>
    </v-row>

    <v-row class="text-left">
      <v-col cols="12" mb-5>

        <v-form
           ref="form"
           v-model="valid"
           method="post"
           id="nativeForm"
           >
          <v-text-field
             v-model="name"
             :rules="nameRules"
             label="First and Last name"
             required
             ></v-text-field>

          <v-text-field
             v-model="partner"
             :rules="simpleRule"
             label="Partner First and Last name"
             ></v-text-field>

          <v-text-field
             v-model="email"
             :rules="emailRules"
             label="Email"
             required
             ></v-text-field>

          <v-text-field
             v-model="city"
             :rules="requiredRules"
             label="City"
             required
             ></v-text-field>
          <v-text-field
             v-model="state"
             :rules="requiredRules"
             label="State"
             required
             ></v-text-field>
          <v-text-field
             v-model="phone"
             :rules="requiredRules"
             label="Phone Number"
             required
             ></v-text-field>
          <v-text-field
             v-model="married"
             :rules="simpleRule"
             label="Marital Status"
             required
             ></v-text-field>
          <v-text-field
             v-model="ages"
             :rules="requiredRules"
             label="Ages (You, Mate, Children)"
             required
             ></v-text-field>
          <v-text-field
             v-model="membership"
             :rules="requirecRules"
             label="Membership Requested"
             required
             ></v-text-field>
          <v-text-field
             v-model="learnabout"
             :rules="simpleRule"
             label="How did you hear about Sky Farm?"
             required
             ></v-text-field>
          <v-text-field
             v-model="affiliations"
             :rules="longRule"
             label="List any other clubs/affiliations, resorts or beaches similar to Sky Farm that you have experiened"
             ></v-text-field>
          <v-text-field
             v-model="aanr"
             :rules="simpleRule"
             label="If you are an AANR member, enter your membership number"
             ></v-text-field>

          <v-btn @click="submit" :disabled="!valid">submit</v-btn>
<!--
          <v-btn
             color="success"
             class="mr-4"
             @click="validate"
             >
            Validate
          </v-btn>
-->
          <v-btn
             color="error"
             class="mr-4 ml-6"
             @click="reset"
             >
            Reset Form
          </v-btn>          
          
        </v-form>

If you are interested in learning more about us please fill out the following information and press the SUBMIT button or Call <a href="tel:908-419-5443">908-419-5443</a>. A member of the membership committee will contact you shortly.

All information submitted will be kept in strict confidence.

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import router from '../router.js'

  export default {
      data: () => ({
          valid: true,
          subok: '',
          name: '',
          nameRules: [
              v => !!v || 'name is required',
              v => (v && v.length <= 20) || 'Name must be less than 20 characters',
          ],
          simpleRule: [
              v => (v.length <= 20) || 'Name must be less than 20 characters',
          ],
          longRule: [
              v => (v.length <= 60) || 'Name must be less than 60 characters',
          ],
          requiredRule: [
              v => !!v || 'Required',
              v => (v.length <= 20) || 'Must be less than 20 characters',
          ],
          email: '',
          emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],      }),

      methods: {
          submit() {
              let data = { name: this.name, partner: this.partner,
                           email: this.email, city: this.city,
                           state: this.state, phone: this.phone,
                           married:  this.married,
                           ages: this.ages, membership: this.membership,
                           learn: this.learnabout,
                           affiliations: this.affiliations,
                           aanr: this.aanr,
                           subject: 'Sky Farm Tour Request',
                           redirect: 'http://www.skyfarm.com',
                           recipient: 'dan@speers.nu',
                           print_config: 'name,partner,married,email,ages,phone,city,state,membership,learn,affiliations,aanr'
                         }
              axios.post('/cgi-bin/contact.cgi', data)
                  .then( response => {
                      this.subok = response.data.status
                      console.log("CGI Reply: " + response.data.status)

                      if ( this.subok == 'ok' ) {
                          router.push('/Next')
                      } else {
                          console.log("CGI Message: " + response.data.message)
                          console.log("CGI Reason:  " + response.data.reason)
                      }
                      
                  })
                  .catch(function (error) {
                      console.log(error);
                      alert("Something went wrong, please try again later.")
                  });

          },
          validate () {
              this.$refs.form.validate()
          },
          reset () {
              this.$refs.form.reset()
          },
          resetValidation () {
              this.$refs.form.resetValidation()
          },
      },

  }

</script>
