<template>
  <Header/>
  <div class="homeDiv">
    <el-card class="homeCard" v-for="item in snippets">
      <template #header>
        <div class="card-header" style="margin-bottom: 20px">
          <el-text style="float: left;font-size: 20px;" type="success">{{ item.title }}</el-text>
          <el-button v-if="item.user_id===user_id" type="success" @click="toEdit(item.snippet_id)"
                     style="float: right">编辑
          </el-button>
        </div>
      </template>
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
import {MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import http from "@/utils/request";
import Header from "@/views/header/header.vue";
import {useRouter} from "vue-router";
import {onBeforeMount, onMounted, onRenderTriggered, onUpdated, reactive, ref} from "vue";

const router = useRouter()
const id = 'preview-only';
let snippets: [] = reactive([])
const user_id = localStorage.getItem("user_id")
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
      snippets.push(x)
    })
  })
}
const toEdit = (id: String) => {
  router.push({
    path: "/edit",
    query: {id: id}
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