<template>
  <Header/>
  <div class="homeDiv">
    <el-card class="homeCard" @click="checkDetails">
      <template #header>
        <div class="card-header" style="margin-bottom: 20px">
          <el-text style="float: left;font-size: 20px;" type="success">二叉树</el-text>
        </div>
      </template>
      <MdPreview :editorId="id" :modelValue="markdown"/>
      <el-text truncated type="success">这是一段java实现的二叉树，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家，谢谢大家</el-text>
      <el-tag class="homeTag"
          v-for="item in tagOptions"
          :key="item"
          type="warning"
          effect="dark"
          round
      >
        {{ item }}
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

const router = useRouter()
let tagOptions = ['Java','JavaScript','Rust']
const id = 'preview-only';
const markdown = '```rust-lang\n' +
    'use tokio;\n' +
    'mod server;\n' +
    'mod db;\n' +
    'mod utils;\n' +
    '\n' +
    '#[tokio::main]\n' +
    'async fn main() {\n' +
    '    server::web_server::web_server_route().await;\n' +
    '}\n' +
    '```'
const checkDetails=()=>{
  console.log("checkDetails")
  router.push("/detail")
}
</script>

<style scoped>
:deep(.code-block) {
  text-align: left;
}
.homeDiv{
  width: 100%;
  height: 100%;
  margin-top: 50px;
  overflow: auto
}
.homeCard{
  width: 50%;
  margin: 0 0 20px 25%
}
.homeTag{
  float: left;
  margin: 10px 0 10px 10px;
  text-align: center
}
</style>