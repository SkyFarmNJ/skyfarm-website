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
          <div
            v-for="(field, i) in form"
            :key=i
            >
            <v-radio-group
              v-if="field.type == 'radio'"
              v-model=field.value
              >
              {{field.label}}
              <v-radio
                v-for="(opt, j) in field.options"
                :key=j
                :label=opt
                :value=opt
                ></v-radio>
            </v-radio-group>
            <v-text-field
              v-else
              v-model=field.value
              :label=field.label
              :type=field.type
              :rules=field.rules
              >
            </v-text-field>
          </div>
          <v-btn @click="submit" :disabled="!valid">submit</v-btn>

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

var rules = {
    shortText: v => (v.length <= 20) || 'Value must be less than 20 characters',
    longText:  v => (v.length <= 60)  || 'Value must be less than 60 characters',
    email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    required: v => !!v || 'required',
}

  export default {
      data: () => ({
          valid: true,
          form: {
              name: {
                  value: '',
                  label: 'First and last name',
                  type: 'text',
                  rules: [rules.shortText, rules.required],
              },
              partner: {
                  value: '',
                  label: 'Partner\'s first and last name',
                  type: 'text',
                  rules: [rules.shortText],
              },
              email: {
                  value: '',
                  label: 'Email',
                  type: 'email',
                  rules: [rules.email, rules.required],
              },
              city: {
                  value: '',
                  label: 'City',
                  type: 'text',
                  rules: [rules.required],
              },
              state: {
                  value: '',
                  label: 'State',
                  type: 'text',
                  rules: [rules.required],
              },
              phone: {
                  value: '',
                  label: 'Phone Number',
                  type: 'tel',
                  rules: [rules.required],
              },
              married: {
                  value: '',
                  label: 'Marital Status',
                  type: 'text',
                  rules: [rules.required],
              },
              ages: {
                  value: '',
                  label: 'Ages (you, partner, children)',
                  type: 'text',
                  rules: [rules.required],
              },
              membership: {
                  value: 'Single',
                  label: 'Membership Requested',
                  type: 'radio',
                  options: ['Single', 'Couple', 'Family'],
              },
              learn: {
                  value: '',
                  label: 'How did you hear about Sky Farm?',
                  type: 'text',
                  rules: [rules.required],
              },
              affiliations: {
                  value: '',
                  label: 'List any other clubs/affiliations, resorts or beaches similar to Sky Farm that you have experiened',
                  type: 'text',
                  rules: [rules.longText, rules.required],
              },
              aanr: {
                  value: '',
                  label: 'If you are an AANR member, enter your membership number',
                  type: 'number',
                  rules: [],
              },
          },
          otherStuff: {
              subject: 'Sky Farm Tour Request',
              redirect: 'http://www.skyfarm.com',
              recipient: 'membership@skyfarm.com',
              sort: 'order:',
          },
          altemail: 'dan@speers.nu',
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
              //v => (v.length <= 20) || 'Must be less than 20 characters',
          ],
          email: '',
          emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],      }),

      methods: {
          submit() {
              var data = {}
              Object.keys(this.form)
                  .forEach(key => {
                      data[key] = this.form[key].value
                      this.otherStuff.sort += `${key},`
                  })
              Object.keys(this.otherStuff)
                  .forEach(key => {
                      data[key] = this.otherStuff[key]
                  })
              data.sort = data.sort.slice(0, -1)
              if ( data.email == this.altemail ) {
                  data.recipient = this.altemail
              }
              console.log(data);
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
      mounted() {
          this.$ga.page('/tour')
      },
  }

</script>
