<template>

  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"

          >
            <v-card class="elevation-12"
                    >
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Member Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="close"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>Cancel</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user"
                    label="Username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="pw"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    @keydown.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="login"
                  >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

</template>

<script>
export default {
    data: () => ({
        user: '',
        pw: '',
    }),
    methods: {
        login() {
            this.$store.dispatch('login', {user: this.user, pw: this.pw})
            this.close()
        },
        close() {
            this.$emit('exit', null)
        }
    }
}
</script>
