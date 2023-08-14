<template>
  <section v-if="canDisplayUser">
    <button :disabled="isEnabled" type="button" @click="onClickClose">
      Close ❌
    </button>

    <header>
      <h1>{{ name }}</h1>
      <date>{{ birthDate }}</date>
      <p>{{ status }}</p>
    </header>

    <div>
      <a @click="openUserLink">user details</a>
      <p v-if="utils.isMobile">{{ description }}</p>
    </div>

    <footer>
      <button type="button" :disabled="isEnabled" @click="onClickFavorite">
        Add to favorite 💘
      </button>
    </footer>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  props: {
    /**
     * Diam eirmod no stet lorem no, sed dolores vero diam.
     *
     * @userId
     */
    userId: {
      type: String,
      required: true,
    },
    /** Ut vero accusam dolor justo diam lorem stet sanctus sit. */
    isEnabled: {
      type: Boolean,
      default: true,
    },
    /** Lorem ipsum dolor sit amet, exercitation */
    unused: {
      type: Object,
      default: () => ({}),
    },
  },
  inject: ['utils'],
  computed: {
    ...mapState('user', ['name', 'birthDate', 'description']),
    ...mapGetters('role', ['canDisplayUser']),
  },
  async mounted() {
    const user = await this.$http()
      .url('/api/user/' + this.userId)
      .get()
      .json();

    this.initUser(user);

    this.$tracker.track({
      content: `user ${this.userId} was loaded`,
      page: this.$route.fullPath,
      enabled: this.$props.isEnabled,
    });
  },
  methods: {
    ...mapActions('user', { initUser: 'init' }),
    ...mapActions('favorites', ['addUserToFavorite']),
    // ...mapActions('favorites', ['unused']),

    onClickClose() {
      this.$emit('close');
    },
    onClickFavorite() {
      this.addUserToFavorite();
    },
    openUserLink() {
      if (this.$store.state.logger['enabled']) {
        this.$store.dispatch('logger/openUserLink');
      }

      this.$store.dispatch('favorites/checkFavorite');

      if (utils.isDesktop) {
        window.open('/user/' + this.userId);
      } else {
        window.open('/mobile-user/' + this.userId);
      }
    },
  },
};
</script>
