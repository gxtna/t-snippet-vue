<template>
  <Header/>
  <div class="contentDiv">
    <div class="divInput">
      <el-text class="textWidth" type="success">片段标题：</el-text>
      <el-text class="textWidth" type="success">{{ contentInfo.title }}</el-text>
    </div>
    <div class="divInput">
      <el-text class="textWidth" type="success">片段标签：</el-text>
      <el-tag class="homeTag"
              v-for="item in contentInfo.tag"
              :key="item"
              type="warning"
              effect="dark"
              round
      >
        {{ item }}
      </el-tag>
    </div>
    <div class="divInput">
      <el-text class="textWidth" type="success">片段描述：</el-text>
      <el-input type="textarea" disabled v-model="contentInfo.desc" :rows="3"></el-input>
    </div>
    <MdPreview :editorId="id" :modelValue="contentInfo.content" style="text-align: left"/>
  </div>
</template>


<script setup lang="ts">

import Header from "@/views/header/header.vue";
import {MdPreview} from 'md-editor-v3';
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import http from "@/utils/request";

const id = "editorId"
let route = useRoute()
let contentInfo = reactive({
  title: '',
  tag: [],
  desc: '',
  content: ''
})
const getDetail = (id: String) => {
  http.get("/get_snippet", {snippet_id: id}).then(res => {
    let data = res.data
    if (data){
      contentInfo.title = data.title
      contentInfo.tag =JSON.parse(data.tags)
      contentInfo.desc = data.description
      contentInfo.content = data.content
    }
  })
}
onMounted(() => {
  let id = route.query.id as String
  getDetail(id);
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

.homeTag {
  float: left;
  margin: 10px 0 10px 10px;
  text-align: center
}
</style>