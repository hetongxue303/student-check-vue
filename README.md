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
    'import/no-extraneous-dependencies': 0
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
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
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
import eslintPlugin from 'vite-plugin-eslint'

plugins: [
  eslintPlugin({
    include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
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
    "prettier": "prettier --write ./**/*.{vue,ts,tsx,js,jsx,css,less,scss,json}"
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
    "*.{js,vue,ts,jsx,tsx}": ["npm run lint", "npm run prettier", "git add"],
    "*.{html,css,less,scss,md}": ["npm run prettier", "git add"]
  }
}
```
