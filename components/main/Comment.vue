<template>
  <el-card class="comment">
    <div class="comment-header">
      <span>{{comment.name}}</span>
      <span>
        <i class="el-icon-time"></i>
        {{ comment.date | date }}
      </span>
    </div>
    <div class="comment-text">
      {{comment.text}}
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment {
    margin-bottom: 1rem;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }

  .comment-text {
    white-space: pre-line;
  }
</style>

