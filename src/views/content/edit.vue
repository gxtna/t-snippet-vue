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
            :key="item.tag_name"
            :label="item.tag_name"
            :value="item.tag_name"
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
import {onMounted, reactive, ref} from "vue";
import http from "@/utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useRoute} from "vue-router";
import {useCodeStore} from "@/stores";

const id = "editorId"
let route = useRoute()
const store = useCodeStore()
let contentInfo = reactive({
  snippet_id: '',
  user_id: '',
  title: '',
  tags: [],
  desc: '',
  content: ''
})
let tagOptions = ref([])
type tagInfo = {
  tag_id: String,
  tag_name: String
}
const commitContent = () => {
  if (contentInfo.tags.length > 5) {
    ElMessage({
      message: '标签最多为5个',
      type: 'warning'
    })
    return
  }
  contentInfo.user_id = store.user_id
  http.post("/write_snippet", contentInfo).then(res => {
    ElMessage({
      message: res.data ? '添加成功' : '添加失败',
      type: res.data ? 'success' : 'warning'
    })
  })
  router.push("/")
}
const getAllTags = () => {
  http.get("/get_all_tags").then(res => {
    let data = res.data as Array<tagInfo>
    data.forEach(x => {
      tagOptions.value.push(x)
    })
  })
}
const getSnippet = (id: String) => {
  http.get("/get_snippet", {snippet_id: id}).then(res => {
    let data = res.data
    if (data) {
      contentInfo.snippet_id = data.snippet_id
      contentInfo.user_id = data.user_id
      contentInfo.title = data.title
      contentInfo.tags = JSON.parse(data.tags)
      contentInfo.desc = data.description
      contentInfo.content = data.content
    }
  })
}
onMounted(() => {
  let id = route.query.id as String
  if (id) getSnippet(id)
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