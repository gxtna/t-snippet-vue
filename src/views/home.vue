<template>
  <header>qweeeeeeee</header>
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
</script>

<style scoped>
/deep/ .code-block {
  text-align: left;
}
</style>