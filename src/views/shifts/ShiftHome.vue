<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          {{ $t('VIEWS.SHIFTS.HOME.PAGE_TITLE') }}
        </h1>

        <b-tabs v-model="activeTabIndex" position="is-right" @input="tabChanged">
          <b-tab-item icon="list" :label="$t('VIEWS.SHIFTS.HOME.VIEWS.LIST')">
            <shift-list />
          </b-tab-item>

          <b-tab-item icon="calendar-alt" :label="$t('VIEWS.SHIFTS.HOME.VIEWS.CALENDAR')">
            <shift-calendar />
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import ShiftList from './ShiftList.vue';
import ShiftCalendar from './ShiftCalendar.vue';

export default Vue.extend({
  name: 'ShiftHome',

  components: {
    ShiftList,
    ShiftCalendar,
  },

  data() {
    const tabs = ['list', 'calendar'];
    const tab = this.$route.query.view as string;
    const activeTabIndex = tabs.includes(tab) ? tabs.indexOf(tab) : 0;

    return {
      tabs,
      activeTabIndex,
    };
  },

  methods: {
    tabChanged(tabIndex: number) {
      const url = new URL(window.location.href);

      url.searchParams.set('view', this.tabs[tabIndex]);

      window.history.replaceState({}, document.title, url.href);
    },
  },
});
</script>
