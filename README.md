# 🐴 马年新年预测

**马年新年预测与行动指引页面**，聚焦年度节奏、重点领域与开运建议，帮助你把愿望落成可执行的计划。

--- 

## 🌟 项目简介

本项目是一个以「马年新年预测」为主题的前端页面，支持本地预览与 Vercel 部署。  
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
├── api/
│   └── chat.js         # Vercel Serverless API（支持 HF / Ollama 双模式）
└── README.md
```

---

## 🚀 部署（Vercel）

### 1) 本地预览（纯前端）

```bash
git clone https://github.com/pcheng0610/Diviner.git
cd Diviner

python3 -m http.server 8000
```

### 2) 本地调试（Ollama 模式）

```bash
# 启动 Ollama
ollama serve
ollama pull llama3.1

# 通过 Vercel Dev 运行 /api/chat
OLLAMA_BASE_URL=http://localhost:11434 npx vercel dev
```

---

## ☁️ 线上部署（Hugging Face 模式）

1. 在 Vercel 控制台设置环境变量：

```
HF_TOKEN=你的 Hugging Face Token
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct   # 可选
```

2. 推送到 GitHub，Vercel 自动部署。

---

## 🔐 安全说明

- API 密钥存于云端环境变量，前端不可见  
- 所有请求经由服务端中转，避免泄露真实接口  
- 本地调试使用 Ollama，不依赖任何 Key  
