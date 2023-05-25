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
                 v-model="contentInfo.tag"
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

const id = "editorId"
let contentInfo = reactive({
  title: '',
  tag: '',
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
  console.log(contentInfo)
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