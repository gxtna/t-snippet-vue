<template>
  <Header/>
  <div class="contentDiv">
    <div class="divInput">
      <el-text class="textWidth" type="success">片段标题：</el-text>
      <el-input v-model="contentInfo.title" placeholder="Please input"/>
    </div>
    <div class="divInput">
      <el-text class="textWidth" type="success">片段标签：</el-text>
      <el-select style="width: 100%"
                 v-model="contentInfo.tags"
                 :multiple="true"
                 :filterable="true"
                 :allow-create="true"
                 :clearable="true"
                 :default-first-option="false"
                 :reserve-keyword="false"
                 placeholder="Choose tags for your article"
      >
        <el-option
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="divInput">
      <el-text class="textWidth" type="success">片段描述：</el-text>
      <el-input v-model="contentInfo.desc" placeholder="Please input"/>
    </div>
    <MdEditor :editorId="id" v-model="contentInfo.content" style="text-align: left"/>
  </div>
  <el-button type="success" @click="commitContent">提交</el-button>
</template>


<script setup lang="ts">

import Header from "@/views/header/header.vue";
import {MdEditor} from 'md-editor-v3';
import {onMounted, reactive} from "vue";
import http from "@/utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";

const id = "editorId"
let contentInfo = reactive({
  user_id: '123456',
  title: '',
  tags: [],
  desc: '',
  content: ''
})
let tagOptions = [
  {
    label: 'Java',
    value: 'Java'
  },
  {
    label: 'JavaScript',
    value: 'JavaScript'
  },
  {
    label: 'Rust',
    value: 'Rust'
  }
]

const commitContent = () => {
  http.post("/write_snippet", contentInfo).then(res => {
    ElMessage({
      message: res.data ? '添加成功' : '添加失败',
      type: res.data ? 'success' : 'warning'
    })
  })
  router.push("/")
}
const getAllTags = () => {
  // TODO 获取所有的tags

}
onMounted(() => {
  getAllTags()
})
</script>

<style scoped>
.divInput {
  margin-bottom: 20px;
  display: flex
}

.contentDiv {
  margin: 50px 50px 50px 50px;
  width: 60%;
  display: inline-block
}

.textWidth {
  width: 100px
}
</style>