<template>
  <div class="news-item">
    <div class="score">
      <span class='arrow' v-bind:class="{ active: item.upvoted }"
      @click='upvote(item)'>▲</span>
      <div>{{ item.score || 0 }}</div>
      <span class='arrow' v-bind:class="{ active: item.downvoted }"
      @click='downvote(item)'>▼</span>
    </div>
    <div class="news-content" style="width: 80%;">
      <img class="hero-img":src="item.featuredImage" />
      <span class="play-button" @click='setActivePlayerItem(item)'>
        <img class="play-icon" src="../assets/play.png" alt="play">
      </span>

      <div class="title">
        <template v-if="item.url">
          <a :href="item.url" target="_blank">{{ item.title.rendered }}</a>
          <span class="host"> ({{ item.url | host }})</span>
        </template>
        <template v-else>
          <router-link :to="'/item/' + item._id">{{ item.title.rendered }}</router-link>
        </template>
      </div>
      <div class="meta">
          <!-- <span v-if="item.type !== 'job'" class="by">
          by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
        </span> -->
        <span class="time">
          <!-- {{ item.time | timeAgo }} ago -->
          {{date}}
        </span>
        <!-- <span v-if="item.type !== 'job'" class="comments-link">
        | <router-link :to="'/item/' + item._id">{{ item.descendants }} comments</router-link>
      </span> -->
      </div>
      <!-- <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span> -->
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import VueAplayer from 'vue-aplayer'
export default {
  name: 'news-item',
  props: ['item'],
  components: {
    'a-player': VueAplayer
  },
  computed: {
    date () {
      return moment(this.item.date).format('MMM Do YY')
    }
  },
  methods: {
    setActivePlayerItem: function (item) {
      this.$store.commit('setActivePlayerItem', { item })
    },
    upvote: function (item) {
      console.log(item)
      this.$store.dispatch('upvote', {
        id: item._id
      })
    },
    downvote: function (item) {
      this.$store.dispatch('downvote', {
        id: item._id
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.news-item
  display inline-flex
  flex-direction row
  background-color #fff
  border-bottom 1px solid #eee
  border-left 1px solid #eee
  position relative
  line-height 20px
  height 220px
  width 50%

  .news-content
    display inline-flex
    flex-direction column
    margin-top 12.5%
    max-width 100%

  .hero-img
    width 100px

  .arrow
    color #888
    &:hover
      cursor pointer
      color #ff6600

    &.active
      color #ff6600 !important
      &:hover
        cursor pointer
        color #888

  .play-button
    width 80px
    height 80px
    position absolute
    top 40px
    left 70px

    .play-icon
      width 80px
  .title
    padding-top 10px
  .score
    display flex
    flex-direction column
    align-items center
    justify-content center
    color #ff6600
    font-size 1.1em
    font-weight 700
    width 15%

  .meta, .host
    font-size .85em
    color #999
    margin-top 5px
    a
      color #999
      text-decoration underline
      &:hover
        color #ff6600

@media (max-width 576px)
  .news-item
    width 100%

    .news-content
      margin-top 8%
</style>
