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
  methods: {
    handleInput(value) {
      this.$emit('update:searchKey', value)
      this.$emit('search', value)
    }
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
