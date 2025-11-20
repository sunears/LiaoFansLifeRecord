# 了凡命谱 (Liaofan's Destiny)

## 项目简介
这是一个基于中国传统劝善典籍《了凡四训》哲学的卡牌修身游戏。玩家将扮演一位修行者，在人生际遇中通过选择不同的处世智慧（改过、积善、谦德、立命）来应对各种道德困境与挑战，从而积累功德、增长智慧，最终改写命运。

游戏的核心叙事引擎由 Google Gemini API 驱动，能够实时推演剧情发展并对玩家的选择进行深度的因果判定。

## 技术架构

本项目采用现代前端技术栈构建：

- **核心框架**: React 19 (TypeScript)
- **样式方案**: Tailwind CSS (原子化 CSS)
- **AI 集成**: Google GenAI SDK (`@google/genai`)
- **字体支持**: Noto Serif SC (正文), Ma Shan Zheng (书法标题)

## 核心功能实现

1. **动态场景生成**:
   利用 Gemini 模型 (`gemini-2.5-flash`)，根据玩家当前的属性（功德、智慧）和回合数，动态生成具有中国文化底蕴的生活场景或道德测试。

2. **智能因果判定**:
   当玩家出牌后，系统将场景上下文与卡牌的哲学含义一同发送给 AI。AI 扮演“判官”角色，分析玩家的动机与手段，返回叙事结果及属性数值的变化。

3. **响应式设计**:
   界面完全适配移动端与桌面端，采用水墨风格 UI，营造沉浸式体验。

## 安装与运行说明

虽然本演示代码设计为在支持 ES Modules 和 Import Map 的环境中直接运行，但若需在本地部署，请参考以下步骤：

### 1. 环境要求
- Node.js (推荐 v18+)
- 包管理器 (npm 或 yarn)

### 2. 初始化项目
推荐使用 Vite 初始化 React + TypeScript 项目：

```bash
npm create vite@latest liaofan-destiny -- --template react-ts
cd liaofan-destiny
npm install
```

### 3. 安装依赖库
安装 Google GenAI SDK 和 Tailwind CSS：

```bash
npm install @google/genai
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. 配置 API Key
由于项目依赖 Google Gemini API，你需要从 Google AI Studio 获取 API Key。

在项目根目录创建 `.env` 文件（或在构建工具中配置环境变量）：

```env
VITE_API_KEY=your_actual_api_key_here
```
*注意：在代码中需修改 `geminiService.ts` 以适配你的环境变量读取方式（例如 `import.meta.env.VITE_API_KEY`）。*

### 5. 移植代码
将提供的 `.tsx`, `.ts`, `.html` 等文件内容复制到本地项目的相应目录中（通常是 `src/` 目录）。

### 6. 启动开发服务器

```bash
npm run dev
```

## 目录结构

```
.
├── index.html              # 入口 HTML，包含 Tailwind 配置和 Import Map
├── index.tsx               # React 入口文件
├── App.tsx                 # 主应用逻辑组件
├── types.ts                # TypeScript 类型定义
├── constants.ts            # 游戏静态数据（卡牌定义、初始数值）
├── services/
│   └── geminiService.ts    # Gemini API 调用封装
└── components/             # UI 组件
    ├── Card.tsx            # 卡牌组件
    ├── ScenarioView.tsx    # 场景显示组件
    ├── StatsPanel.tsx      # 属性面板
    ├── ResultModal.tsx     # 结果结算弹窗
    └── HelpModal.tsx       # 帮助说明弹窗
```

## 许可证
MIT License