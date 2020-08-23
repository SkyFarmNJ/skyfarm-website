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
           :lazy-validation="lazy"
           >
          <v-text-field
             v-model="name"
             :rules="nameRules"
             label="First and Last Name"
             required
             ></v-text-field>

          <v-text-field
             v-model="partner"
             :rules="nameRules"
             label="Partner First and Last Name"
             ></v-text-field>

          <v-text-field
             v-model="email"
             :rules="emailRules"
             label="Email"
             required
             ></v-text-field>

          <v-text-field
             v-model="city"
             :rules="nameRules"
             label="City"
             required
             ></v-text-field>
          <v-text-field
             v-model="state"
             :rules="nameRules"
             label="State"
             required
             ></v-text-field>
          <v-text-field
             v-model="phone"
             :rules="nameRules"
             label="Phone Number"
             required
             ></v-text-field>
          <v-text-field
             v-model="status"
             :rules="nameRules"
             label="Marital Status"
             required
             ></v-text-field>
          <v-text-field
             v-model="ages"
             :rules="nameRules"
             label="Ages (You, Mate, Children)"
             required
             ></v-text-field>
          <v-text-field
             v-model="type"
             :rules="nameRules"
             label="Membership Requested"
             required
             ></v-text-field>
          <v-text-field
             v-model="learn"
             :rules="nameRules"
             label="How did you hear about Sky Farm?"
             required
             ></v-text-field>
          <v-text-field
             v-model="otherclubs"
             :rules="nameRules"
             label="List any other clubs/affiliations, resorts or beaches similar to Sky Farm that you have experiened"
             required
             ></v-text-field>
          <v-text-field
             v-model="aanr"
             :rules="nameRules"
             label="If you are an AANR member, enter your membership number"
             ></v-text-field>

          <v-btn
             color="success"
             class="mr-4"
             @click="validate"
             >
            Submit
          </v-btn>
          
          <v-btn
             color="error"
             class="mr-4"
             @click="reset"
             >
            Reset Form
          </v-btn>          
          
        </v-form>

If you are interested in learning more about us please fill out the following information and press the SUBMIT button or Call 908-419-5443. A member of the membership committee will contact you shortly.

All information submitted will be kept in strict confidence.

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
      data: () => ({
          valid: true,
          name: '',
          nameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          email: '',
          emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],      }),

      methods: {
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
