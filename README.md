# AI Jam Playground 🎵

AI Jam Playground 是一个交互式音乐创作平台，允许用户通过钢琴键盘或架子鼓即兴创作旋律，并通过 Suno AI 生成高质量的音乐片段。该应用程序专为音乐爱好者、内容创作者和直播主设计，无需专业音乐理论知识即可创作音乐。

![AI Jam Playground](public/screenshot.png)

## ✨ 主要功能

- **多种创作入口**：通过钢琴键盘 (使用计算机键盘 A-S-D-F-G-H-J / W-E-T-Y-U) 或架子鼓 (数字键 1-9) 创作旋律
- **AI 音乐生成**：调用 Suno API 根据演奏的音符生成 15-30 秒的音乐
- **丰富的自定义选项**：调整音乐风格、模型版本、速度、是否纯伴奏等
- **直观的音乐可视化**：使用 WaveSurfer.js 显示音频波形并提供播放控制
- **音乐下载**：一键下载生成的音乐为 MP3 格式
- **深色霓虹 UI**：赏心悦目的深色界面和霓虹灯效果
- **响应式设计**：适配桌面和移动设备的界面布局
- **PWA 支持**：可作为渐进式 Web 应用安装到设备上，支持离线演奏

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript + Vite
- **样式**：TailwindCSS + shadcn/ui
- **音频处理**：Tone.js (本地合成) + wavesurfer.js (波形显示)
- **状态管理**：Zustand
- **后端代理**：Vercel Serverless Functions
- **部署**：Vercel

## 📦 本地开发

### 先决条件

- Node.js 16.x 或更高版本
- Suno API 密钥 (从 [Suno](https://suno.ai) 获取)

### 安装步骤

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/ai-jam-playground.git
   cd ai-jam-playground
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量
   ```bash
   cp .env.example .env
   ```
   编辑 `.env` 文件，添加你的 Suno API 密钥：
   ```
   VITE_SUNO_API_KEY=your_suno_api_key_here
   VITE_SUNO_CALLBACK=http://localhost:3000/api/suno-callback
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

5. 浏览器中打开 [http://localhost:5173](http://localhost:5173)

## 🚀 部署到 Vercel

1. Fork 本仓库到你的 GitHub 账户

2. 在 [Vercel](https://vercel.com) 创建一个新项目并导入你的 GitHub 仓库

3. 在项目设置中添加以下环境变量：
   - `VITE_SUNO_API_KEY`: 你的 Suno API 密钥
   - `VITE_SUNO_CALLBACK`: 你的 Vercel 部署 URL + `/api/suno-callback` (例如: `https://your-project.vercel.app/api/suno-callback`)

4. 完成并部署

## 📝 使用说明

1. **选择乐器**：在顶部标签页中选择钢琴键盘或架子鼓
2. **即兴演奏**：使用键盘弹奏音符 (钢琴使用 A-S-D-F-G-H-J / W-E-T-Y-U，架子鼓使用数字键 1-9)
3. **录制旋律**：点击"开始录制"按钮或按下"R"键开始录制，按"S"键停止
4. **设置参数**：在控制面板中填写音乐描述、调整风格、速度等参数
5. **生成音乐**：点击"生成AI音乐"按钮
6. **试听与下载**：生成完成后播放音乐并下载 MP3 文件

## 🔄 API 代理说明

本项目使用 Vercel Serverless Functions 代理 Suno API 请求，避免 CORS 问题：

- `POST /api/v1/generate` - 创建音乐生成任务
- `GET /api/v1/generate/{id}` - 查询任务状态
- `POST /api/v1/generate/extend` - 延长现有音乐

## 📄 许可证

MIT 