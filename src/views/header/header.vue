<template>
  <div class="headerContainer">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-image style="width: 100px; height: 30px;margin-top: 10px" :fit="'fill'" :src="avatarUrl" @click="goHome"/>
      </el-col>
      <el-col :span="14">
        <el-input
            v-model="searchInput"
            class="w-50 m-2"
            placeholder="找一个代码片段">
          <template #suffix>
            <el-icon class="el-input__icon">
              <search @click="searchData"/>
            </el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4" style="display: flex;">
        <el-button type="primary" @click="writeSnippet" style="font-size: 12px;margin-top: 10px">写一个</el-button>
        <div v-if="store.user_name.length >0" style="text-align: center">
          <el-text style="margin-left: 20px;margin-bottom: 8px" class="mx-1" type="success">{{
              store.user_name
            }}
          </el-text>
          <el-avatar style="margin-left: 20px;margin-top: 8px" :size="30" :src="store.user_avatar"/>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="loginVisible" title="登录Snippet" width="30%">
    <el-collapse>
      <el-collapse-item title="账号密码登录" name="1">
        <el-form
            label-width="100px"
            style="max-width: 460px"
        >
          <el-form-item label="账号">
            <el-input/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input/>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input/>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 50px">
      <el-text class="mx-1" type="success">其他方式登录</el-text>
    </div>
    <div style="margin-top: 20px">
      <el-image class="svgLogin" src="src/assets/svg/github-fill.svg" @click="github_login"></el-image>
      <el-image class="svgLogin" src="src/assets/svg/gitee.svg" @click="github_login"></el-image>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="loginVisible = false">取消</el-button>
        <el-button type="primary" @click="snippetLogin">登录</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import http from "@/utils/request";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useCodeStore} from "@/stores";

const store = useCodeStore()
const router = useRouter()
let searchInput = ref("")
const loginVisible = ref(false)
const avatarUrl = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
const github_login = () => {
  let url = 'https://github.com/login/oauth/authorize?client_id=cfc1410aa53dc97243dd&redirect_uri=http://127.0.0.1:5173/callback'
  let iWidth = 500;                         //弹出窗口的宽度;
  let iHeight = 570;                        //弹出窗口的高度;
  let iTop = (window.screen.height - 30 - iHeight) / 2;       //获得窗口的垂直位置;
  let iLeft = (window.screen.width - 10 - iWidth) / 2;        //获得窗口的水平位置;
  let style = 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizable=no,location=no,status=no'
  window.open(url, "", style)
}
let code = ref("")
window.addEventListener("storage", (e) => {
  if (e.newValue) {
    code.value = e.newValue
  }
})
watch(code, () => {
  githubLogin(code.value)
})
const githubLogin = async (code) => {
  await http.get("/github_login", {code: code}).then(res => {
    if (res.data) {
      store.user_name = res.data.login
      store.user_avatar = res.data.avatar_url
      store.user_id = res.data.user_id
    }
    localStorage.setItem("token", "token")
    loginVisible.value = false
  })
}
const goHome = () => {
  router.push("/")
}
const writeSnippet = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // 跳转页面 ,显示用户信息
    router.push({
      path: '/edit'
    })
  } else {
    // 弹出登录窗口
    loginVisible.value = true
  }
}
const snippetLogin = () => {
  localStorage.setItem("token", "token")
  loginVisible.value = false
}
const emits = defineEmits(["sendMag"])
const searchData = () => {
  emits("sendMag", searchInput.value)
}

</script>

<style scoped>
.headerContainer {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  line-height: 50px;

}

.svgLogin {
  width: 30px;
  height: 30px;
  margin: 10px 10px 0 10px;
}

</style>