<template xmlns="http://www.w3.org/1999/html">
  <div class="headerContainer">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-image style="width: 100px; height: 30px;margin-top: 10px" :fit="'fill'" :src="avatarUrl"/>
      </el-col>
      <el-col :span="12">
        <el-input
            v-model="input2"
            class="w-50 m-2"
            placeholder="找一个代码片段">
          <template #suffix>
            <el-icon class="el-input__icon">
              <search/>
            </el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4" style="display: flex;">
        <el-button type="primary" @click="writeSnippet" style="font-size: 12px;margin-top: 10px">写一个</el-button>
        <el-text style="margin-left: 20px;margin-bottom: 8px" class="mx-1" type="success">{{ userInfo.userName }}</el-text>
        <el-avatar style="margin-left: 20px;margin-top: 8px" :size="30" :src="userInfo.userAvatar"/>
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
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
const loginVisible = ref(false)
let userInfo = reactive({
  userName: 'gxtna',
  userAvatar: 'https://avatars.githubusercontent.com/u/55348895?v=4'
})
const avatarUrl = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
const github_login = () => {
  let url = 'https://github.com/login/oauth/authorize?client_id=cfc1410aa53dc97243dd&redirect_uri=http://127.0.0.1:5173/callback'
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
    window.removeEventListener("storage", githubLogin)
  }
})
const githubLogin = async (code) => {
  await http.get("/github_login", {code: code}).then(res => {
    console.log(res)
  })
  localStorage.removeItem("code")
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

    console.log("2")
  }
}
const snippetLogin = () => {
  // snippet 的账号密码登录
  // TODO
  localStorage.setItem("token", "token")
  loginVisible.value = false
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