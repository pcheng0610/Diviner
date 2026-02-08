# 🐴 马年新年预测

**马年新年预测与行动指引页面**，聚焦年度节奏、重点领域与开运建议，帮助你把愿望落成可执行的计划。

---

## 🌟 项目简介

本项目是一个以「马年新年预测」为主题的前端页面，支持本地预览与 Cloudflare Pages 部署。  
前后端统一部署，API 密钥安全存储在服务端环境变量中。

---

## ✅ 核心功能

- 🐴 年度总览：主轴与节奏
- 💼 事业财运：机会点与策略
- 💕 情感家庭：关系走向与沟通建议
- 🧧 开运建议：颜色/方位/时间点
- 🎯 目标规划：行动清单与优先级

---

## 📱 操作方式

- **手机用户**：从屏幕左边缘向右滑动打开菜单，向左滑动关闭
- **电脑用户**：点击左上角 ☰ 打开菜单

---

## 📂 项目结构

```
Diviner/
├── index.html          # 前端页面
├── styles.css          # 主题样式
├── script.js           # 交互逻辑
├── functions/          # Cloudflare 云端函数
│   └── api/
│       └── chat.js     # AI 通信代理（密钥安全存储）
└── README.md
```

---

## 🚀 部署（Cloudflare Pages）

### 🍎 Mac

```bash
git clone https://github.com/pcheng0610/Diviner.git
cd Diviner

npm install -g wrangler
wrangler login
wrangler pages project create diviner --production-branch main

echo "你的API密钥" | wrangler pages secret put MODELSCOPE_API_KEY --project-name=diviner
echo "你的API密钥" | wrangler pages secret put IFLOW_API_KEY --project-name=diviner
echo "你的API密钥" | wrangler pages secret put HUGGINGFACE_API_KEY --project-name=diviner

wrangler pages deploy . --project-name=diviner
```

### 🪟 Windows

```cmd
git clone https://github.com/pcheng0610/Diviner.git
cd Diviner

npm install -g wrangler
wrangler login
wrangler pages project create diviner --production-branch main

echo 你的API密钥 | wrangler pages secret put MODELSCOPE_API_KEY --project-name=diviner
echo 你的API密钥 | wrangler pages secret put IFLOW_API_KEY --project-name=diviner
echo 你的API密钥 | wrangler pages secret put HUGGINGFACE_API_KEY --project-name=diviner

wrangler pages deploy . --project-name=diviner
```

---

## 🛡️ 安全说明

- API 密钥存于云端环境变量，前端不可见
- 所有请求经由服务端中转，避免泄露真实接口

