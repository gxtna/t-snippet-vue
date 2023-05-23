<template>
  <header>qweeeeeeee</header>
  <el-button @click="github_login">github</el-button>
  <div style="width: 100%;height: 800px">
    <MdPreview :editorId="id" :modelValue="markdown"/>
    <!--    <MdEditor v-model="markdown"></MdEditor>-->
  </div>
  <footer>qweeeeeeeee</footer>
</template>


<script setup lang="ts">
import {MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import http from "@/utils/request";
import axios from "axios";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

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
const github_login = () => {
  let url = 'https://github.com/login/oauth/authorize?client_id=cfc1410aa53dc97243dd&redirect_uri=http://127.0.0.1:5173/callback'
  let name;                           //网页名称，可为空;
  let iWidth = 500;                         //弹出窗口的宽度;
  let iHeight = 570;                        //弹出窗口的高度;
  //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
  let iTop = (window.screen.height - 30 - iHeight) / 2;       //获得窗口的垂直位置;
  let iLeft = (window.screen.width - 10 - iWidth) / 2;        //获得窗口的水平位置;
  let style = 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizable=no,location=no,status=no'
  window.open(url, "", style)
}
window.addEventListener("storage", (e) => {
  if (e.newValue) {
    githubLogin(e.newValue)
    window.removeEventListener("storage",githubLogin)
  }
})
const githubLogin = async (code) => {
  await http.get("/github_login", {code: code}).then(res => {
    console.log(res)
  })
  localStorage.removeItem("code")
}
</script>

<style scoped>
:deep(.code-block) {
  text-align: left;
}
</style>