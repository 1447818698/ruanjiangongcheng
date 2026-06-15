<template>
  <div class="search-bar">
    <el-button type="primary" icon="el-icon-plus" @click="$emit('add')">
      新增学生
    </el-button>
    <div class="search-bar-right">
      <el-input
        :value="searchKey"
        placeholder="搜索学号或姓名"
        prefix-icon="el-icon-search"
        clearable
        size="medium"
        style="width: 260px"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentSearchBar',
  props: {
    searchKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      debounceTimer: null
    }
  },
  methods: {
    handleInput(value) {
      // 输入框实时显示
      this.$emit('update:searchKey', value)
      // 搜索事件防抖 300ms
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.$emit('search', value)
      }, 300)
    }
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer)
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.search-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
