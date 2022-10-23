# 学生考勤系统

## 一、初始化项目

```shell
npm init vite@latest student-check-vue -- --template vue-ts
cd student-check-vue
npm install
npm run dev
```

## 二、基础配置

### 2.1 配置 env 环境

- `.env`

```text
# 端口设置
VITE_PORT=5173

# 程序标题
VITE_GLOB_APP_TITLE='Student Check'

# 程序简称
VITE_GLOB_APP_SHORT_NAME='student_check_vue'
```

- `.env.development`

```text
# 开发环境
VITE_ENV = 'development'

# 后端URL
VITE_GLOB_BASE_URL  = 'http://127.0.0.1:8080'

# 请求根URL
VITE_GLOB_BASIC_API=/api

# 文件上传URL
VITE_GLOB_UPLOAD_URL=/upload
```

- `.env.production`

```text
# 环境名称
VITE_ENV = 'production'

# 后台URL
VITE_GLOB_BASE_URL  = ''

# 请求根URL
VITE_GLOB_BASIC_API=

# 文件上传URL
VITE_GLOB_UPLOAD_URL=
```

### 2.2 配置 vite

- 为保证 node 正常使用 安装此依赖

```shell
# node依赖
npm install @types/node -D
```

- 配置 `vite.config.ts`

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@views': resolve(__dirname, 'src/views'),
      '@layout': resolve(__dirname, 'src/layout'),
      '@components': resolve(__dirname, 'src/components')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    cors: true,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

- 配置 `tsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "useDefineForClassFields": true,
    "lib": ["esnext", "dom"],
    "types": ["node", "vite/client"]
  },
  "skipLibCheck": true,
  "noImplicitAny": true,
  "noImplicitThis": true,
  "strictNullChecks": false,
  "suppressImplicitAnyIndexErrors": true,
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"],
    "@views/*": ["src/views/*"],
    "@layout/*": ["src/layout"],
    "@components/*": ["src/components/*"]
  },
  "exclude": ["node_modules"],
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "vite.config.ts"
  ],
  "types": ["vite/client"],
  "typeRoots": ["./node_modules/@types/", "./types"],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

- 修改 `package.json`

_作用：用于解决打包时发生错误_

```json
{
  "script": {
    "dev": "vite --force --host",
    "build": "vue-tsc --noEmit --skipLibCheck && vite build"
  }
}
```

### 2.3 代码规范

#### 2.3.1 EditorConfig

作用：有助于为不同的 IDE 编辑器处理同一项目的多个开发人员维护一致的编码风格。

- 新建 `.editorconfig` 配置文件

```shell
# Editor配置项, 请参考 http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

#### 2.3.2 ESLint

作用：代码检查，编辑器启用 Eslint 之后，不符合规范的会自动进行提示。

- 安装 ESLint 依赖

```shell
# ESLint核心库
npm install eslint -D
# ESLint的TS依赖
npm install @types/eslint -D
# ESLint结合Vue代码规范
npm install eslint-plugin-vue -D
# ESLint结合Airbnb代码规范(依赖plugin-import)
npm install eslint-config-airbnb-base eslint-plugin-import -D
# 在import时可以使用@
npm install eslint-import-resolver-alias -D
```

- 解决 ESLint 与 Typescript 冲突依赖

```shell
# 由于ESLint默认使用Espree语法解析，是不能识别TypeScript某些语法，所以需安装@typescript-eslint/parser替换掉默认解析器
npm install @typescript-eslint/parser -D
# 补充额外得typescript语法的规则
npm install @typescript-eslint/eslint-plugin -D
```

- 新建 `.eslintrc.cjs` 配置文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    // vue语法糖
    'vue/setup-compiler-macros': true
  },
  overrides: [],
  extends: [
    // vue3默认的推荐规范
    'plugin:vue/vue3-recommended',
    // eslint/typescript 默认的推荐规范
    'plugin:@typescript-eslint/recommended',
    // airbnb代码规范
    'airbnb-base',
    // eslint默认推荐的规范
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    alias: {
      map: [['@', './src']]
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  // 0 = off, 1 = warn, 2 = error
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/order': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'no-console': 1,
    'no-unused-vars': 0,
    'vue/multi-word-component-names': 0,
    'vue/valid-template-root': 0,
    'prettier/prettier': 0
  }
}
```

- 新建 `.eslintignore` 忽略文件

```text
node_modules/*
index.html
dist/*
/public/*
/docs/*
/bin/*
.husky/*
.idea/*
.vscode/*
*.md
*.woff
*.ttf
*.d.ts
*.sh
*.log
```

- 修改 `package.json`

```json
{
  "scripts": {
    "lint": "eslint  {**/*,*}.{js,ts,jsx,tsx,html,vue} --fix"
  }
}
```

##### _Tip_:vite 集成 eslint

- 添加依赖

```shell
npm install vite-plugin-eslint
```

- 修改 `vite.config.ts`

```ts
// vite.config.ts
import eslintPlugin from 'vite-plugin-eslint'

plugins: [
  eslintPlugin({
    include: ['{**/*,*}.{js,ts,jsx,tsx,html,vue}'],
    cache: false
  })
]
```

#### 2.3.3 Prettier

作用：Prettier 是一款强大的代码格式化工具，支持
`JavaScript`、`TypeScript`、`CSS`、`Scss`、`Less`、`Jsx`、`Angular`、`Vue`
、`GraphQL`、`Json`、`Markdown` 等语言，基本上前端能用到的文件格式它都可以搞定，
是当下最流行的代码格式化工具。Prettier 支持 `.json`、 `.yaml` 、 `.yml`、 `.js`
等格式的配置文件。

- 安装 `prettier` 依赖

```shell
# prettier核心依赖
npm install prettier -D
```

- 解决 ESLint 与 Prettier 冲突依赖

在使用 eslint 和 prettier 时会存在一些规则上的冲突，此时就需要用到
eslint-plugin-prettier 和 eslint-config-prettier。以形成 prettier 规则>eslint 规
则。

```shell
# 禁用所有和 Prettier 产生冲突的规则
npm install eslint-config-prettier -D
# 使eslint使用prettier规则进行检查
npm install eslint-plugin-prettier -D
```

- `.eslintrc.cjs` 添加依赖

```js
module.exports = {
  extends: [
    //注意该插件必须放在最后
    'plugin:prettier/recommended'
  ],
  // 添加 prettier 插件
  plugins: ['prettier']
}
```

- 创建 `.prettierrc.cjs` 配置文件

```js
module.exports = {
  // 单行输出长度
  printWidth: 80,
  // 不使用缩进符，使用空格
  useTabs: false,
  // 缩进空格数
  tabWidth: 2,
  // 是否在语句末尾分号
  semi: false,
  // 是否使用单引号
  singleQuote: true,
  // 尽在需要时在对象属性周围添加引号 可选值"<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 去除对象最末尾元素跟随的逗号 可选值"<none|es5|all>"，默认none
  trailingComma: 'none',
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 默认折行标准 always\never\preserve
  proseWrap: 'always',
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需在开头自动插入@prettier
  insertPragma: false,
  // 换行符使用 lf 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto',
  // 是否在对象属性添加空格
  bracketSpacing: true,
  // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  htmlWhitespaceSensitivity: 'css',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false
}
```

- 新建 `.prettierignore` 忽略文件

```text
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

public/*
*.d.ts
```

- 修改 `package.json`

```json
{
  "scripts": {
    "prettier": "prettier --write {**/*,*}.{vue,css,scss,less,json,js,ts,jsx,tsx}"
  }
}
```

#### 2.3.4 husky + lint-staged

husky , Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push
等）触发我们的命令。主要为了解决配置 eslint 后仍不能将 eslint 中的问题解决掉。我
们需要提交的代码符合 eslint 代码规范，则需要执行 git commit 命令时对其进行校验,
如若不符合 eslint 规范就会自动进行修复。 lint-staged 这个工具一般结合 husky 来使
用，它可以让 husky 的 hook 触发的命令只作用于 git add 那些文件（即 git 暂存区的
文件），而不会影响到其他文件。

- 安装依赖

```shell
npm install husky lint-staged -D
```

- `package.json` 添加 husky

- 初始化 `husky`

```shell
npx husky-init
```

- 修改 `.husky/pre-commit`

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,vue,ts,jsx,tsx}": ["npm run lint", "npm run prettier"],
    "*.{html,css,less,scss,md}": ["npm run prettier"]
  }
}
```

### 2.4 样式配置

#### 样式文件

- 添加 `less/sass` 处理器

```shell
# less
npm install less less-loader node-less -D
# sass
npm install sass sass-loader node-sass -D
```

- 全局样式 `src/assets/styles/index.scss`

```scss
@import 'transition.scss';
@import 'variable.scss';
@import 'mixin.scss';

/* 父容器 */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft
      YaHei, Arial, sans-serif;
}

/*设置进度条颜色  不配置时为默认颜色*/
#nprogress .bar {
  background: rgba(245, 208, 25, 0.5) !important;
}

/*设置滚动条样式*/
::-webkit-scrollbar {
  width: 5px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(26, 25, 25, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}
```

- 混入 `src/assets/styles/mixin.scss`

```scss
@mixin content-ful {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- 动画 `src/assets/styles/transition.scss`

```scss
// 全局动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-transform--move,
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-leave-active {
  position: absolute;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

// 面包屑动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
```

- 常量 `src/assets/styles/variable.scss`

```scss
/****************************** 菜单相关样式变量 ******************************/
$menu-text-color: #fff;
$menu-active-text-color: #ffd04b;
$menu-background-color: #545c64;
$menu-logo-title-color: #ffffff;

$menu-sub-menu-background: #1f2d3d;
$menu-sub-menu-hover: #001528;

$menu-height: 100vh;
$menu-width: 64px;
$menu-not-width: 200px;

:export {
  menuTextColor: $menu-text-color;
  menuActiveTextColor: $menu-active-text-color;
  menuBackgroundColor: $menu-background-color;
  menuLogoTitleColor: $menu-logo-title-color;
  menuSubMenuBackground: $menu-sub-menu-background;
  menuSubMenuHover: $menu-sub-menu-hover;
  menuHeight: $menu-height;
  menuWidth: $menu-width;
  menuNotWidth: $menu-not-width;
}
```

- 全局注册样式

```ts
// src/main.ts
import './assets/styles/index.scss'
```

#### element plus

- 安装依赖

```shell
# element plus
npm install element-plus --save
# element plus icon
npm install @element-plus/icons-vue
```

- 配置 element plus

```ts
// src/plugins/element-plus.ts
import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons-vue'

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale,
      size: 'default' || 'small' || 'large'
    })
    Object.keys(Icons).forEach((key: string) => {
      app.component(key, Icons[key as keyof typeof Icons])
    })
  }
}
```

- 全局注册

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from './plugins/element-plus'

const app = createApp(App)

app.use(ElementPlus).mount('#app')
```

#### animate.css

如何使用：[使用详情](https://animate.style/)

- 安装依赖

```shell
npm install animate.css --save
```

- 全局注册动画

_在`src/assets/styles/index.scss`中添加下列代码_

```scss
// src/assets/styles/index.scss
@import 'animate.css';
```

#### windi css

官网：[Windi Css](https://cn.windicss.org/) 使用
：[使用详情](https://cn.windicss.org/utilities/general/colors.html)

- 安装依赖

```shell
npm install windicss vite-plugin-windicss -D
```

- 修改 `vite.config.ts`

```ts
// vite.config.ts
import WindiCSS from 'vite-plugin-windicss'

export default {
  plugins: [WindiCSS()]
}
```

- 全局注册样式

```ts
// src/main.ts
import 'virtual:windi.css'
```

### 2.5 vue-router

- 添加依赖

```shell
npm install vue-router@latest
# 配合nProgress使用
npm install nprogress --save
npm install @types/nprogress -D
```

- 配置 vue-router

```ts
// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute
} from 'vue-router'
import routes from './routes'
import NProgress from '../plugins/nProgress'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const WITHE_LIST: string[] = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
})

router.afterEach(() => {})

export default router
```

- 配置 nProgress

```ts
// src/plugins/nProgress.ts
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default nProgress.configure({
  easing: 'linear', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否使用进度环
  minimum: 0.3, // 初始化最小百分比
  trickleSpeed: 200, // 自动递进间隔速度
  parent: 'body' // 指定父容器
})
```

- 全局注册

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(router).mount('#app')
```

### pinia

- 安装依赖

```shell
npm install pinia
# 这个插件如果用不着可以不装
npm install pinia-plugin-persistedstate
```

- 配置 pinia

```ts
// src/store/index.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default createPinia().use(piniaPluginPersistedstate)

// src/store/modules/user.ts
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: (): IUserStore => {
    return {}
  },
  getters: {},
  actions: {},
  persist: {
    key: 'USER'
  }
})
```

- 全局注册

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

import pinia from './store'

const app = createApp(App)

app.use(pinia).mount('#app')
```

### axios

- 安装依赖

```shell
npm install axios --save
```

- 添加 token 处理类

```ts
// src/utils/anth.ts(用于配合axios使用)
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()
const Authorization = 'Authorization'

export const getToken = (): string => {
  return cookies.get(Authorization)
}

export const removeToken = () => {
  cookies.remove(Authorization)
}

export const setToken = (token: string) => {
  cookies.set(Authorization, token)
}
```

- 配置 axios

```ts
// src/utils/request.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import NProgress from '../plugins/nProgress'
import { ElNotification } from 'element-plus'
import { getToken } from './auth'

axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
  timeoutErrorMessage: '请求超时',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    NProgress.start()
    // 让每个请求携带自定义token
    if (getToken() && config.headers) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error: any) => {
    ElNotification.error('未知错误')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status !== 200 || response.data.code !== 200) {
      switch (response.status as number) {
        case 401:
          ElNotification.warning('您未登录，请先登录')
          const router = useRouter()
          await router.replace('/login')
          break
        case 403:
          ElNotification.warning('您无权访问，请联系管理员')
          break
        // 50008:非法令牌    50012:其他客户端登录    50014:令牌过期
        case 50008 | 50012 | 50014:
          ElNotification.warning('您的登录信息已失效，请您再次登录')
          break
      }
    }
    NProgress.done()
    return response
  },
  (error: any) => {
    ElNotification.error('服务器异常')
    return Promise.reject(error)
  }
)

export default axios
```

- 使用案例

```ts
import axios from '../../utils/request'

const baseAPI = import.meta.env.VITE_GLOB_BASIC_API

export const test = () => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/test`
  })
}
```

## 其他插件

### qs

- 安装依赖

```shell
npm install qs --save
npm install @types/qs -D
```

- 使用

```ts
import * as qs from 'qs'
```

### vueUse

- 安装依赖

```shell
npm install @vueuse/core
```

- 基本使用

更多使用请访问：[vueUse](https://vueuse.org/)

```vue
<template>
  <h1>鼠标坐标:{{ x }},{{ y }}</h1>
</template>
<script lang="ts" setup>
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>
```

### cookie

- 安装依赖

```shell
# cookie依赖安装
npm install universal-cookie
# 由于universal-cookie依赖于vueuse/integrations 故需要安装
npm install @vueuse/integrations
```

- 使用

```ts
import { useCookies } from '@vueuse/integrations/useCookies'
```

### jsencrypt

- 安装依赖

```shell
npm install jsencrypt --save
```

- 创建工具类 `jsencrypt.ts`

```ts
// src/utils/jsencrypt.ts
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkoliRyO9NEkbuxirTrvANBjvn\n' +
  'dLC4npst+e2IubgEuzuNOwg77kj1SKZcsg0rgusFsg+QhNDfzgNp4XacXYvNbYF2\n' +
  'NwKcLaNOJJ2JP+Jh6Ll1p41WZWLXCiFBc9axTU1T8FmnoSdqB4bLRz628iDV/jsG\n' +
  'ggxeLuyKvpKpLqMVUQIDAQAB'

const privateKey =
  'MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBAOSiWJHI700SRu7G\n' +
  'KtOu8A0GO+d0sLiemy357Yi5uAS7O407CDvuSPVIplyyDSuC6wWyD5CE0N/OA2nh\n' +
  'dpxdi81tgXY3Apwto04knYk/4mHouXWnjVZlYtcKIUFz1rFNTVPwWaehJ2oHhstH\n' +
  'PrbyINX+OwaCDF4u7Iq+kqkuoxVRAgMBAAECgYEA1IxQhockYKQDKWs02UIijBkl\n' +
  'i5Eh0SAx51YXiyoMdumQ/UTJ7N0jGlSFxFsKf07gKpVUfufaPpWI+t/NoqQcmAVK\n' +
  'JEqRlftUpUMWnmgawY58sH7nVAbx4mz6DKIWYfalPU6WajV85zmKNrTeqJaC58Hy\n' +
  '16kXhh4TL3TSQQ0m1SECQQD9hriiU6WgVofEL9pIZ2oOUkJomh2TEAVvr2H8wz+x\n' +
  'ru5JcNZLrIgf2syu1fAV55rnxOAivewmZIIRLT4WgR+dAkEA5t1yfcaRDIlnl9nX\n' +
  'JDdng/QxOOrBbhGIlsDtdOUoBXUeXVqD/LuhJQmeT3FzngfGNvsn6RIYBg4kH6Ls\n' +
  '0t7QRQJBAPQQZOCIbDMN+keI1bfMLpI46ItwijYQP1uEWG2PvVqdj/INeY+COc2I\n' +
  'wnExrZ44x6yFoExxz8wqB/jnOBVMGxUCQQCLBaVRWka0fvXT+olUtMxwKJePh8Zt\n' +
  'ar+O0KTttKUSDEH5w20hvzc933nmqxINgu744utYrd2rn85fArSME0LlAkEA/R5I\n' +
  'Ae6A8NQDhSnstfKXB73mQAmAkF27siUBSlg57eBLPBJ854LtOCZ1/itdbRGPm3g0\n' +
  'IPKI7Em1/0lXtTisQQ=='

/**
 * 文本加密
 *
 * @param text 明文
 */
export const encrypt = (text: string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(text)
}

/**
 * 文本解密
 *
 * @param text 密文
 */
export const decrypt = (text: string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(text)
}
```

### md5

- 安装依赖

```shell
npm install js-md5
npm install @types/js-md5 -D
```

- 创建工具类 `encryptMD5.ts`

```ts
// src/hook/encryptMD5.ts
import md5 from 'js-md5'

/**
 * 密码加密后在发送请求
 * @param password 密码
 */
export const encryptMD5 = (password: string): string => {
  return md5(md5(password).split('').reverse().join(''))
}
```

### base64

- 安装依赖

```shell
npm install @vueuse/core
```

- 使用

```ts
import { Ref, ref } from 'vue'
import { useBase64 } from '@vueuse/core'

const text = ref('')
const { base64 } = useBase64(text)
```

## 封装组件

### svgIcon

- 安装依赖

```shell
npm install vite-plugin-svg-icons -D
```

- 创建 svg 组件

```vue
<template>
  <svg
    :aria-hidden="true"
    class="svg-icon"
    :style="{
      color: color,
      height: size + 'em',
      width: size + 'em',
      fill: fill
    }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  prefix: { type: String as PropType<string>, default: 'icon' },
  name: { type: String as PropType<string>, required: true },
  color: { type: String as PropType<string>, default: '' },
  size: { type: Number as PropType<number>, default: 1 },
  fill: { type: String as PropType<string>, default: 'currentColor' }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped lang="scss">
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
```

- 修改 `vite.config.ts`

```ts
// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // svg图标存放路径
      iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
})
```

- 全局注册

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:svg-icons-register'
import svgIcon from '@components/svgIcon/Index.vue'

const app = createApp(App)

app.component('svg-icon', svgIcon).mount('#app')
```

- 使用组件

```vue
<svg-icon name="bug" />
```
