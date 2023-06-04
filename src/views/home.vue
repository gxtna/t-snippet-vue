<template>
  <Header @sendMag="searchData"/>
  <div class="homeDiv">
    <el-card class="homeCard" v-for="item in snippets">
      <template #header>
        <div class="card-header" style="margin-bottom: 20px">
          <el-text style="float: left;font-size: 16px;" type="success">{{ item.title }}</el-text>
        </div>
      </template>
      <div style="display: flex">
        <el-button v-if="item.user_id===user_id" type="success" size="small" @click="toEdit(item.snippet_id)"
                   style="margin-left: 85%">编辑
        </el-button>
        <el-button v-if="item.user_id===user_id" type="success" size="small" @click="toDelete(item.snippet_id)"
                   style="float: right">删除
        </el-button>
      </div>
      <MdPreview :editorId="id" :modelValue="item.content" @click="checkDetails(item.snippet_id)"/>
      <el-text truncated type="success">
        {{ item.desc }}
      </el-text>
      <el-tag class="homeTag"
              v-for="tag in (item.tags)"
              :key="tag"
              type="warning"
              effect="dark"
              round
      >
        {{ tag }}
      </el-tag>
    </el-card>
  </div>
</template>


<script setup lang="ts">
import {MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import http from "@/utils/request";
import Header from "@/views/header/header.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useCodeStore} from "@/stores";
import {ElMessageBox} from "element-plus";

const router = useRouter()
const id = 'preview-only';
const snippets = ref([])
const store = useCodeStore()
const user_id = store.user_id
const checkDetails = (snippet_id: String) => {
  router.push({
    path: "/detail",
    query: {id: snippet_id}
  })
}
const getAllSnippet = () => {
  http.get("/get_all_snippets").then(res => {
    res.data.forEach(x => {
      x.desc = x.description
      x.tags = JSON.parse(x.tags)
      snippets.value.push(x)
    })
  })
}
const toEdit = (id: String) => {
  router.push({
    path: "/edit",
    query: {id: id}
  })
}
const toDelete = (id: String) => {
  http.get("/delete_snippet", {snippet_id: id}).then(res => {
    ElMessageBox({
      message: res ? "删除成功" : "删除失败",
      type: res ? "success" : "error"
    })
  })
  getAllSnippet()
}

const searchData = (searchInput) => {
  http.get("/search_data", {desc: searchInput}).then(res => {
    console.log(res)
    snippets.value = []
    res.data.forEach(x => {
      x.desc = x.description
      x.tags = JSON.parse(x.tags)
      snippets.value.push(x)
    })
  })
}
onMounted(() => {
  getAllSnippet()
})
</script>

<style scoped>
:deep(.code-block) {
  text-align: left;
}

.homeDiv {
  width: 100%;
  height: 80%;
  margin-top: 50px;
  overflow: auto
}

.homeCard {
  width: 50%;
  margin: 0 0 20px 25%
}

.homeTag {
  float: left;
  margin: 10px 0 10px 10px;
  text-align: center
}
</style>