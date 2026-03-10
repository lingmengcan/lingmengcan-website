<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, Search, ExternalLink, Copy, Check, Cpu, MessageSquare, Image as ImageIcon, Database, Shield, Settings } from 'lucide-vue-next'

const copied = ref<number | null>(null)

async function copyCode(code: string, index: number) {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = index
    setTimeout(() => { copied.value = null }, 2000)
  } catch {
    // fallback
  }
}

const sidebar = [
  {
    title: '快速开始',
    items: [
      { name: '环境要求', active: true },
      { name: '安装部署' },
    ],
  },
  {
    title: '功能指南',
    items: [
      { name: 'AI 对话' },
      { name: '知识库 RAG' },
      { name: 'AI 绘图' },
      { name: '模型管理' },
    ],
  },
  {
    title: 'API 文档',
    items: [
      { name: 'API 概览' },
      { name: '对话接口' },
      { name: '知识库接口' },
    ],
  },
  {
    title: '部署指南',
    items: [
      { name: 'Docker 部署' },
      { name: '手动部署' },
      { name: 'Nginx 配置' },
    ],
  },
]

const activeDoc = ref('环境要求')

// 代码片段常量（避免模板中引号嵌套问题）
const codeSnippets: Record<number, string> = {
  1: 'git clone https://github.com/lingmengcan/lingmengcan-ai.git\ncd lingmengcan-ai',
  2: 'cd service\npnpm install\n# 修改 config.development.yaml 中的数据库连接\npnpm run start:dev',
  3: 'cd web\npnpm install\npnpm dev',
  4: 'git clone https://github.com/lingmengcan/lingmengcan-ai.git\ncd lingmengcan-ai\n\n# 修改环境变量配置\ncp .env.example .env\n# 编辑 .env 文件配置数据库密码、API Key 等\n\n# 启动所有服务\ndocker-compose up -d',
  5: '# 查看服务状态\ndocker-compose ps\n\n# 查看日志\ndocker-compose logs -f service\n\n# 重启服务\ndocker-compose restart service\n\n# 停止所有服务\ndocker-compose down\n\n# 更新并重启\ngit pull && docker-compose up -d --build',
  10: 'CREATE DATABASE lingmengcan_ai DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;',
  20: 'pip install chromadb\nchroma run --host 0.0.0.0 --port 8000',
  30: 'git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git\ncd stable-diffusion-webui\n./webui.sh --api --listen',
  40: '# 安装 Ollama\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# 拉取模型\nollama pull llama3\nollama pull qwen2\n\n# 启动 Ollama 服务\nollama serve',
  50: 'Authorization: Bearer <your-token>',
  51: `curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "admin",
    "password": "123456"
  }'`,
  60: '{\n  "conversationId": "uuid",\n  "model": "gpt-4o",\n  "message": "你好，请介绍一下自己",\n  "stream": true\n}',
  70: '{\n  "name": "产品文档",\n  "description": "公司产品相关文档合集",\n  "embeddingModel": "text-embedding-ada-002"\n}',
  71: `curl -X POST http://localhost:3000/api/knowledge/{id}/upload \\
  -H "Authorization: Bearer <token>" \\
  -F "file=@document.pdf"`,
  72: '{\n  "query": "如何配置数据库连接？",\n  "topK": 5\n}',
  80: '# 构建后端\ncd service\npnpm install --frozen-lockfile\npnpm run build\n\n# 构建前端\ncd ../web\npnpm install --frozen-lockfile\npnpm run build',
  81: '# 安装 PM2\nnpm install -g pm2\n\n# 启动后端服务\ncd service\npm2 start dist/main.js --name lingmengcan-ai\n\n# 查看状态\npm2 status\n\n# 查看日志\npm2 logs lingmengcan-ai\n\n# 设置开机自启\npm2 startup\npm2 save',
  90: `server {
    listen 80;
    server_name your-domain.com;

    # 前端静态资源
    location / {
        root /var/www/lingmengcan-ai/web/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # SSE 流式输出代理
    location /api/chat/send {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding on;
    }
}`,
  91: `server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # ... 其余配置同上
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}`,
}
</script>

<template>
  <div class="docs-page">
    <div class="docs-container">
      <div class="docs-layout">
        <!-- Sidebar -->
        <aside class="docs-sidebar">
          <div class="sidebar-inner">
            <!-- Search -->
            <div class="search-box">
              <Search :size="16" class="search-icon" />
              <input
                type="text"
                placeholder="搜索文档..."
                class="search-input"
              />
            </div>

            <div v-for="group in sidebar" :key="group.title" class="sidebar-group">
              <h4 class="sidebar-group-title">{{ group.title }}</h4>
              <ul class="sidebar-list">
                <li v-for="item in group.items" :key="item.name">
                  <button
                    class="sidebar-link"
                    :class="{ active: activeDoc === item.name }"
                    @click="activeDoc = item.name"
                  >
                    {{ item.name }}
                  </button>
                </li>
              </ul>
            </div>

            <!-- GitHub 文档链接 -->
            <div class="sidebar-footer">
              <a
                href="https://github.com/lingmengcan/lingmengcan-ai"
                target="_blank"
                rel="noopener"
                class="github-docs-link"
              >
                <BookOpen :size="14" />
                查看完整文档
                <ExternalLink :size="12" />
              </a>
            </div>
          </div>
        </aside>

        <!-- Content -->
        <main class="docs-content">
          <!-- ==================== 快速开始 ==================== -->

          <!-- 环境要求 -->
          <div v-if="activeDoc === '环境要求'" class="glass-card docs-card">
            <div class="docs-header">
              <BookOpen :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">环境要求</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                在开始安装 Lingmengcan AI 平台之前，请确保你的开发环境满足以下要求：
              </p>

              <h2 class="docs-h2">系统要求</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>组件</th>
                      <th>版本</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">Node.js</td>
                      <td><code class="version-tag">≥ 18.0</code></td>
                      <td>推荐 20 LTS</td>
                    </tr>
                    <tr>
                      <td class="component-name">pnpm</td>
                      <td><code class="version-tag">≥ 8.0</code></td>
                      <td>包管理器</td>
                    </tr>
                    <tr>
                      <td class="component-name">MySQL</td>
                      <td><code class="version-tag">≥ 8.0</code></td>
                      <td>关系型数据库</td>
                    </tr>
                    <tr>
                      <td class="component-name">Redis</td>
                      <td><code class="version-tag">≥ 6.0</code></td>
                      <td>缓存与会话管理</td>
                    </tr>
                    <tr>
                      <td class="component-name">ChromaDB</td>
                      <td><code class="version-tag">最新版</code></td>
                      <td>向量数据库（可选，知识库功能需要）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="docs-h2">硬件建议</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>场景</th>
                      <th>CPU</th>
                      <th>内存</th>
                      <th>磁盘</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">开发环境</td>
                      <td>2 核</td>
                      <td>4 GB</td>
                      <td>20 GB</td>
                    </tr>
                    <tr>
                      <td class="component-name">生产环境（基础）</td>
                      <td>4 核</td>
                      <td>8 GB</td>
                      <td>50 GB</td>
                    </tr>
                    <tr>
                      <td class="component-name">生产环境（含绘图）</td>
                      <td>8 核 + GPU</td>
                      <td>16 GB</td>
                      <td>100 GB</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">💡 提示：</strong>
                  如果不需要知识库（RAG）功能，可以跳过 ChromaDB 安装。
                  AI 绘图功能需要额外部署 Stable Diffusion WebUI，并推荐使用 NVIDIA GPU。
                </p>
              </div>
            </div>
          </div>

          <!-- 安装部署 -->
          <div v-if="activeDoc === '安装部署'" class="glass-card docs-card">
            <div class="docs-header">
              <BookOpen :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">安装部署</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                使用 pnpm 快速安装和启动 Lingmengcan AI 平台。
              </p>

              <h2 class="docs-h2">1. 克隆项目</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[1], 1)">
                    <Check v-if="copied === 1" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 克隆项目</span>
git clone https://github.com/lingmengcan/lingmengcan-ai.git
cd lingmengcan-ai</code></pre>
              </div>

              <h2 class="docs-h2">2. 配置数据库</h2>
              <p class="docs-text">
                创建 MySQL 数据库并导入初始化脚本：
              </p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">sql</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[10], 10)">
                    <Check v-if="copied === 10" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>CREATE DATABASE lingmengcan_ai
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;</code></pre>
              </div>

              <h2 class="docs-h2">3. 启动后端</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[2], 2)">
                    <Check v-if="copied === 2" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>cd service
pnpm install
<span class="comment"># 修改 config.development.yaml 中的数据库连接</span>
pnpm run start:dev</code></pre>
              </div>

              <h2 class="docs-h2">4. 启动前端</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[3], 3)">
                    <Check v-if="copied === 3" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>cd web
pnpm install
pnpm dev

<span class="comment"># 访问 http://localhost:8089</span>
<span class="comment"># 默认账号：admin / 123456</span></code></pre>
              </div>

              <h2 class="docs-h2">5. 配置说明</h2>
              <p class="docs-text">
                后端配置文件位于 <code class="inline-code">service/config.development.yaml</code>，主要配置项：
              </p>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>配置项</th>
                      <th>说明</th>
                      <th>默认值</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">database.host</td>
                      <td>MySQL 主机地址</td>
                      <td><code class="version-tag">localhost</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">database.port</td>
                      <td>MySQL 端口</td>
                      <td><code class="version-tag">3306</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">database.database</td>
                      <td>数据库名称</td>
                      <td><code class="version-tag">lingmengcan_ai</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">redis.host</td>
                      <td>Redis 主机地址</td>
                      <td><code class="version-tag">localhost</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">jwt.secret</td>
                      <td>JWT 密钥</td>
                      <td><code class="version-tag">需自行设置</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ==================== 功能指南 ==================== -->

          <!-- AI 对话 -->
          <div v-if="activeDoc === 'AI 对话'" class="glass-card docs-card">
            <div class="docs-header">
              <MessageSquare :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">AI 对话</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                Lingmengcan AI 支持多模型对话，可灵活切换不同 AI 提供商和模型，实现智能对话、内容生成等功能。
              </p>

              <h2 class="docs-h2">支持的模型</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>提供商</th>
                      <th>模型</th>
                      <th>特点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">OpenAI</td>
                      <td>GPT-4o、GPT-4、GPT-3.5</td>
                      <td>通用能力最强</td>
                    </tr>
                    <tr>
                      <td class="component-name">通义千问</td>
                      <td>Qwen-Max、Qwen-Plus、Qwen-Turbo</td>
                      <td>中文能力优秀</td>
                    </tr>
                    <tr>
                      <td class="component-name">智谱 AI</td>
                      <td>GLM-4、GLM-3-Turbo</td>
                      <td>开源中文大模型</td>
                    </tr>
                    <tr>
                      <td class="component-name">讯飞星火</td>
                      <td>Spark 4.0、Spark 3.5</td>
                      <td>多模态能力</td>
                    </tr>
                    <tr>
                      <td class="component-name">Ollama</td>
                      <td>Llama 3、Mistral、Qwen 等</td>
                      <td>本地私有化部署</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="docs-h2">对话功能</h2>
              <ul class="feature-list">
                <li><strong>多轮对话</strong>：支持上下文连续对话，自动维护对话历史</li>
                <li><strong>流式输出</strong>：基于 SSE (Server-Sent Events) 实现逐字输出效果</li>
                <li><strong>Markdown 渲染</strong>：支持代码高亮、表格、LaTeX 公式等富文本渲染</li>
                <li><strong>对话管理</strong>：支持新建、删除、清空对话，对话历史持久化存储</li>
                <li><strong>模型切换</strong>：在对话中实时切换不同模型，对比回答质量</li>
                <li><strong>Token 统计</strong>：显示每次对话的 Token 消耗量</li>
              </ul>

              <h2 class="docs-h2">使用方法</h2>
              <ol class="deploy-steps">
                <li>在后台「模型管理」中配置至少一个 AI 模型的 API Key</li>
                <li>进入对话页面，选择要使用的模型</li>
                <li>输入问题即可开始对话，支持 Shift+Enter 换行</li>
                <li>点击对话标题可编辑对话名称</li>
              </ol>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">💡 提示：</strong>
                  使用 Ollama 可以在本地运行开源模型，无需 API Key，适合隐私要求高的场景。
                  配置 Ollama 地址后即可像使用云端模型一样使用本地模型。
                </p>
              </div>
            </div>
          </div>

          <!-- 知识库 RAG -->
          <div v-if="activeDoc === '知识库 RAG'" class="glass-card docs-card">
            <div class="docs-header">
              <Database :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">知识库 RAG</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                基于 RAG（检索增强生成）技术，支持上传自有文档构建知识库，让 AI 基于你的专属数据进行智能问答。
              </p>

              <h2 class="docs-h2">工作原理</h2>
              <div class="architecture-flow">
                <div class="flow-step">
                  <span class="flow-number">1</span>
                  <div class="flow-content">
                    <strong>文档上传</strong>
                    <p>上传 PDF、TXT、Markdown、Word 等格式文档</p>
                  </div>
                </div>
                <div class="flow-step">
                  <span class="flow-number">2</span>
                  <div class="flow-content">
                    <strong>文本分块</strong>
                    <p>将文档拆分为合适大小的文本块（Chunk）</p>
                  </div>
                </div>
                <div class="flow-step">
                  <span class="flow-number">3</span>
                  <div class="flow-content">
                    <strong>向量化</strong>
                    <p>使用 Embedding 模型将文本转为向量，存入 ChromaDB</p>
                  </div>
                </div>
                <div class="flow-step">
                  <span class="flow-number">4</span>
                  <div class="flow-content">
                    <strong>检索问答</strong>
                    <p>用户提问时检索相关文档片段，结合 AI 生成精准回答</p>
                  </div>
                </div>
              </div>

              <h2 class="docs-h2">支持的文档格式</h2>
              <div class="tag-group">
                <span class="doc-tag">.pdf</span>
                <span class="doc-tag">.txt</span>
                <span class="doc-tag">.md</span>
                <span class="doc-tag">.docx</span>
                <span class="doc-tag">.csv</span>
                <span class="doc-tag">.json</span>
              </div>

              <h2 class="docs-h2">环境准备</h2>
              <p class="docs-text">
                知识库功能依赖 ChromaDB 向量数据库，请先安装并启动 ChromaDB：
              </p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[20], 20)">
                    <Check v-if="copied === 20" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 安装 ChromaDB</span>
pip install chromadb

<span class="comment"># 启动 ChromaDB 服务</span>
chroma run --host 0.0.0.0 --port 8000</code></pre>
              </div>

              <h2 class="docs-h2">使用步骤</h2>
              <ol class="deploy-steps">
                <li>在后台「知识库管理」中创建一个新的知识库</li>
                <li>上传文档文件，系统自动解析、分块并生成向量</li>
                <li>进入对话页面，选择关联知识库模式</li>
                <li>提问即可获得基于知识库内容的精准回答</li>
              </ol>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">💡 提示：</strong>
                  文档分块大小和重叠度会影响检索效果，建议根据文档类型调整参数。
                  对于技术文档建议 chunk size 为 500-1000 字符。
                </p>
              </div>
            </div>
          </div>

          <!-- AI 绘图 -->
          <div v-if="activeDoc === 'AI 绘图'" class="glass-card docs-card">
            <div class="docs-header">
              <ImageIcon :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">AI 绘图</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                集成 Stable Diffusion WebUI，支持文生图（Text-to-Image）功能，通过自然语言描述生成精美图片。
              </p>

              <h2 class="docs-h2">功能特性</h2>
              <ul class="feature-list">
                <li><strong>文生图</strong>：输入提示词（Prompt），AI 自动生成高质量图片</li>
                <li><strong>负面提示词</strong>：通过 Negative Prompt 排除不想要的元素</li>
                <li><strong>参数调节</strong>：支持调整生成步数、尺寸、CFG Scale 等参数</li>
                <li><strong>模型选择</strong>：支持切换不同的 Stable Diffusion 模型（Checkpoint）</li>
                <li><strong>历史记录</strong>：所有生成的图片自动保存，可随时查看和下载</li>
              </ul>

              <h2 class="docs-h2">部署 Stable Diffusion WebUI</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[30], 30)">
                    <Check v-if="copied === 30" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 克隆 Stable Diffusion WebUI</span>
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

<span class="comment"># 启动（需要开启 API 模式）</span>
./webui.sh --api --listen</code></pre>
              </div>

              <p class="docs-text">
                启动后在 Lingmengcan AI 后台配置 SD WebUI 的 API 地址（默认 <code class="inline-code">http://localhost:7860</code>）即可使用。
              </p>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">⚠️ 注意：</strong>
                  AI 绘图功能需要 NVIDIA 独立显卡支持，推荐至少 6GB 显存。
                  启动 SD WebUI 时务必添加 <code class="inline-code">--api</code> 参数以开启 API 接口。
                </p>
              </div>
            </div>
          </div>

          <!-- 模型管理 -->
          <div v-if="activeDoc === '模型管理'" class="glass-card docs-card">
            <div class="docs-header">
              <Settings :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">模型管理</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                灵活管理多个 AI 模型配置，支持添加、编辑、启用/禁用不同模型提供商。
              </p>

              <h2 class="docs-h2">配置模型</h2>
              <p class="docs-text">
                进入后台「系统管理 → 模型管理」页面，配置 AI 模型信息：
              </p>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>字段</th>
                      <th>说明</th>
                      <th>示例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">模型名称</td>
                      <td>显示名称，自定义</td>
                      <td>GPT-4o</td>
                    </tr>
                    <tr>
                      <td class="component-name">模型标识</td>
                      <td>API 调用时使用的模型 ID</td>
                      <td><code class="version-tag">gpt-4o</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">API Base</td>
                      <td>模型 API 基础地址</td>
                      <td><code class="version-tag">https://api.openai.com/v1</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">API Key</td>
                      <td>API 密钥</td>
                      <td><code class="version-tag">sk-xxx...</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">模型类型</td>
                      <td>对话/绘图/嵌入</td>
                      <td>对话模型</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="docs-h2">使用 Ollama 本地模型</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[40], 40)">
                    <Check v-if="copied === 40" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 安装 Ollama</span>
curl -fsSL https://ollama.com/install.sh | sh

<span class="comment"># 拉取模型</span>
ollama pull llama3
ollama pull qwen2

<span class="comment"># 启动 Ollama 服务</span>
ollama serve</code></pre>
              </div>

              <p class="docs-text">
                配置 Ollama 模型时，API Base 填写 <code class="inline-code">http://localhost:11434/v1</code>，API Key 可填任意字符串。
              </p>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">💡 提示：</strong>
                  可以通过修改 API Base 地址来接入任何兼容 OpenAI 格式的 API 代理服务，
                  比如 one-api、new-api 等 API 聚合管理工具。
                </p>
              </div>
            </div>
          </div>

          <!-- ==================== API 文档 ==================== -->

          <!-- API 概览 -->
          <div v-if="activeDoc === 'API 概览'" class="glass-card docs-card">
            <div class="docs-header">
              <Cpu :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">API 概览</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                Lingmengcan AI 平台提供 RESTful API 接口，所有接口使用 JSON 格式进行数据交互。
              </p>

              <h2 class="docs-h2">基础信息</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>项目</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">Base URL</td>
                      <td><code class="inline-code">http://your-domain:3000/api</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">认证方式</td>
                      <td>Bearer Token（JWT）</td>
                    </tr>
                    <tr>
                      <td class="component-name">数据格式</td>
                      <td>JSON</td>
                    </tr>
                    <tr>
                      <td class="component-name">字符编码</td>
                      <td>UTF-8</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="docs-h2">认证</h2>
              <p class="docs-text">
                所有 API 请求需要在 Header 中携带 JWT Token：
              </p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">http</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[50], 50)">
                    <Check v-if="copied === 50" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>Authorization: Bearer &lt;your-token&gt;</code></pre>
              </div>

              <h2 class="docs-h2">获取 Token</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[51], 51)">
                    <Check v-if="copied === 51" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "123456"
  }'</code></pre>
              </div>

              <h2 class="docs-h2">统一响应格式</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">json</span>
                </div>
                <pre><code>{
  "code": 200,
  "message": "success",
  "data": { ... }
}</code></pre>
              </div>

              <h2 class="docs-h2">错误码</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>错误码</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">200</td>
                      <td>请求成功</td>
                    </tr>
                    <tr>
                      <td class="component-name">401</td>
                      <td>未认证或 Token 过期</td>
                    </tr>
                    <tr>
                      <td class="component-name">403</td>
                      <td>权限不足</td>
                    </tr>
                    <tr>
                      <td class="component-name">500</td>
                      <td>服务器内部错误</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 对话接口 -->
          <div v-if="activeDoc === '对话接口'" class="glass-card docs-card">
            <div class="docs-header">
              <MessageSquare :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">对话接口</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                对话相关的 API 接口，支持创建对话、发送消息、获取历史记录等功能。
              </p>

              <h2 class="docs-h2">发送消息（流式）</h2>
              <div class="api-endpoint">
                <span class="api-method post">POST</span>
                <code class="api-path">/api/chat/send</code>
              </div>
              <p class="docs-text">请求参数：</p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">json</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[60], 60)">
                    <Check v-if="copied === 60" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>{
  "conversationId": "uuid",
  "model": "gpt-4o",
  "message": "你好，请介绍一下自己",
  "stream": true
}</code></pre>
              </div>

              <h2 class="docs-h2">获取对话列表</h2>
              <div class="api-endpoint">
                <span class="api-method get">GET</span>
                <code class="api-path">/api/chat/conversations</code>
              </div>
              <p class="docs-text">返回当前用户的所有对话列表。</p>

              <h2 class="docs-h2">获取对话历史</h2>
              <div class="api-endpoint">
                <span class="api-method get">GET</span>
                <code class="api-path">/api/chat/messages/:conversationId</code>
              </div>
              <p class="docs-text">返回指定对话的消息历史记录。</p>

              <h2 class="docs-h2">删除对话</h2>
              <div class="api-endpoint">
                <span class="api-method delete">DELETE</span>
                <code class="api-path">/api/chat/conversations/:id</code>
              </div>
              <p class="docs-text">删除指定的对话及其所有消息。</p>
            </div>
          </div>

          <!-- 知识库接口 -->
          <div v-if="activeDoc === '知识库接口'" class="glass-card docs-card">
            <div class="docs-header">
              <Database :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">知识库接口</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                知识库相关的 API 接口，支持知识库的创建、管理、文档上传与向量检索。
              </p>

              <h2 class="docs-h2">创建知识库</h2>
              <div class="api-endpoint">
                <span class="api-method post">POST</span>
                <code class="api-path">/api/knowledge/create</code>
              </div>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">json</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[70], 70)">
                    <Check v-if="copied === 70" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>{
  "name": "产品文档",
  "description": "公司产品相关文档合集",
  "embeddingModel": "text-embedding-ada-002"
}</code></pre>
              </div>

              <h2 class="docs-h2">上传文档</h2>
              <div class="api-endpoint">
                <span class="api-method post">POST</span>
                <code class="api-path">/api/knowledge/:id/upload</code>
              </div>
              <p class="docs-text">
                使用 <code class="inline-code">multipart/form-data</code> 格式上传文档文件。
              </p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[71], 71)">
                    <Check v-if="copied === 71" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>curl -X POST http://localhost:3000/api/knowledge/{id}/upload \
  -H "Authorization: Bearer &lt;token&gt;" \
  -F "file=@document.pdf"</code></pre>
              </div>

              <h2 class="docs-h2">知识库检索</h2>
              <div class="api-endpoint">
                <span class="api-method post">POST</span>
                <code class="api-path">/api/knowledge/:id/search</code>
              </div>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">json</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[72], 72)">
                    <Check v-if="copied === 72" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>{
  "query": "如何配置数据库连接？",
  "topK": 5
}</code></pre>
              </div>

              <h2 class="docs-h2">获取知识库列表</h2>
              <div class="api-endpoint">
                <span class="api-method get">GET</span>
                <code class="api-path">/api/knowledge/list</code>
              </div>
              <p class="docs-text">返回当前用户的所有知识库列表及文档数量统计。</p>
            </div>
          </div>

          <!-- ==================== 部署指南 ==================== -->

          <!-- Docker 部署 -->
          <div v-if="activeDoc === 'Docker 部署'" class="glass-card docs-card">
            <div class="docs-header">
              <BookOpen :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">Docker 部署</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                使用 Docker Compose 一键部署 Lingmengcan AI 平台，包含所有依赖服务。
              </p>

              <h2 class="docs-h2">前置要求</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>组件</th>
                      <th>版本</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">Docker</td>
                      <td><code class="version-tag">≥ 20.10</code></td>
                    </tr>
                    <tr>
                      <td class="component-name">Docker Compose</td>
                      <td><code class="version-tag">≥ 2.0</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="docs-h2">快速部署</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[4], 4)">
                    <Check v-if="copied === 4" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 克隆项目</span>
git clone https://github.com/lingmengcan/lingmengcan-ai.git
cd lingmengcan-ai

<span class="comment"># 修改环境变量配置</span>
cp .env.example .env
<span class="comment"># 编辑 .env 文件配置数据库密码、API Key 等</span>

<span class="comment"># 启动所有服务</span>
docker-compose up -d</code></pre>
              </div>

              <h2 class="docs-h2">服务说明</h2>
              <div class="table-wrap">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>服务</th>
                      <th>端口</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="component-name">web</td>
                      <td><code class="version-tag">8089</code></td>
                      <td>前端 Web 应用</td>
                    </tr>
                    <tr>
                      <td class="component-name">service</td>
                      <td><code class="version-tag">3000</code></td>
                      <td>后端 API 服务</td>
                    </tr>
                    <tr>
                      <td class="component-name">mysql</td>
                      <td><code class="version-tag">3306</code></td>
                      <td>MySQL 数据库</td>
                    </tr>
                    <tr>
                      <td class="component-name">redis</td>
                      <td><code class="version-tag">6379</code></td>
                      <td>Redis 缓存</td>
                    </tr>
                    <tr>
                      <td class="component-name">chromadb</td>
                      <td><code class="version-tag">8000</code></td>
                      <td>向量数据库（可选）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 class="docs-h2">常用命令</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[5], 5)">
                    <Check v-if="copied === 5" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 查看服务状态</span>
docker-compose ps

<span class="comment"># 查看日志</span>
docker-compose logs -f service

<span class="comment"># 重启服务</span>
docker-compose restart service

<span class="comment"># 停止所有服务</span>
docker-compose down

<span class="comment"># 更新并重启</span>
git pull && docker-compose up -d --build</code></pre>
              </div>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">💡 提示：</strong>
                  如果不需要知识库功能，可在 <code class="inline-code">docker-compose.yml</code> 中注释掉 chromadb 服务。
                  首次启动时会自动初始化数据库。
                </p>
              </div>
            </div>
          </div>

          <!-- 手动部署 -->
          <div v-if="activeDoc === '手动部署'" class="glass-card docs-card">
            <div class="docs-header">
              <BookOpen :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">手动部署</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                适用于需要自定义配置的生产环境部署。
              </p>

              <h2 class="docs-h2">部署步骤</h2>
              <ol class="deploy-steps">
                <li>
                  <strong>安装依赖</strong>：确保 Node.js ≥ 18、pnpm ≥ 8、MySQL ≥ 8.0 已安装
                </li>
                <li>
                  <strong>配置数据库</strong>：创建 MySQL 数据库，修改 <code class="inline-code">service/config.production.yaml</code> 配置
                </li>
                <li>
                  <strong>构建后端</strong>：<code class="inline-code">cd service && pnpm install && pnpm run build</code>
                </li>
                <li>
                  <strong>构建前端</strong>：<code class="inline-code">cd web && pnpm install && pnpm run build</code>
                </li>
                <li>
                  <strong>配置 Nginx</strong>：将前端 dist 目录配置为静态资源，后端接口代理到 Node 服务
                </li>
                <li>
                  <strong>启动服务</strong>：使用 PM2 或 systemd 管理 Node 进程
                </li>
              </ol>

              <h2 class="docs-h2">构建命令</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[80], 80)">
                    <Check v-if="copied === 80" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 构建后端</span>
cd service
pnpm install --frozen-lockfile
pnpm run build

<span class="comment"># 构建前端</span>
cd ../web
pnpm install --frozen-lockfile
pnpm run build</code></pre>
              </div>

              <h2 class="docs-h2">使用 PM2 管理进程</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[81], 81)">
                    <Check v-if="copied === 81" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code><span class="comment"># 安装 PM2</span>
npm install -g pm2

<span class="comment"># 启动后端服务</span>
cd service
pm2 start dist/main.js --name lingmengcan-ai

<span class="comment"># 查看状态</span>
pm2 status

<span class="comment"># 查看日志</span>
pm2 logs lingmengcan-ai

<span class="comment"># 设置开机自启</span>
pm2 startup
pm2 save</code></pre>
              </div>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">💡 提示：</strong>
                  生产环境建议使用 <code class="inline-code">--frozen-lockfile</code> 确保依赖版本一致。
                  完整的部署配置示例请参考
                  <a href="https://github.com/lingmengcan/lingmengcan-ai" target="_blank" rel="noopener" style="color: #818CF8;">GitHub 仓库</a>。
                </p>
              </div>
            </div>
          </div>

          <!-- Nginx 配置 -->
          <div v-if="activeDoc === 'Nginx 配置'" class="glass-card docs-card">
            <div class="docs-header">
              <Shield :size="24" style="color: #818CF8;" />
              <h1 class="docs-title">Nginx 配置</h1>
            </div>

            <div class="docs-body">
              <p class="docs-intro">
                推荐使用 Nginx 作为反向代理，同时托管前端静态资源和代理后端 API 请求。
              </p>

              <h2 class="docs-h2">基础配置</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">nginx</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[90], 90)">
                    <Check v-if="copied === 90" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>server {
    listen 80;
    server_name your-domain.com;

    <span class="comment"># 前端静态资源</span>
    location / {
        root /var/www/lingmengcan-ai/web/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    <span class="comment"># 后端 API 代理</span>
    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    <span class="comment"># SSE 流式输出代理（关键：关闭缓冲）</span>
    location /api/chat/send {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding on;
    }
}</code></pre>
              </div>

              <h2 class="docs-h2">HTTPS 配置</h2>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">nginx</span>
                  <button class="copy-code-btn" @click="copyCode(codeSnippets[91], 91)">
                    <Check v-if="copied === 91" :size="14" style="color: #34D399;" />
                    <Copy v-else :size="14" />
                  </button>
                </div>
                <pre><code>server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    <span class="comment"># ... 其余配置同上</span>
}

<span class="comment"># HTTP 重定向到 HTTPS</span>
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}</code></pre>
              </div>

              <div class="glass-card tip-box">
                <p>
                  <strong class="tip-label">⚠️ 注意：</strong>
                  对于 AI 对话的 SSE 流式输出，必须关闭 Nginx 的 <code class="inline-code">proxy_buffering</code>，
                  否则会导致消息无法实时推送。推荐使用 Let's Encrypt 免费获取 SSL 证书。
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  padding-top: 24px;
}

.docs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.docs-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
}

@media (max-width: 1024px) {
  .docs-layout {
    grid-template-columns: 1fr;
  }
  .docs-sidebar {
    display: none;
  }
}

.sidebar-inner {
  position: sticky;
  top: 96px;
}

.search-box {
  position: relative;
  margin-bottom: 24px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748B;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 36px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: white;
  outline: none;
  transition: border-color 0.2s;
}

.search-input::placeholder {
  color: #64748B;
}

.search-input:focus {
  border-color: rgba(99, 102, 241, 0.5);
}

.sidebar-group {
  margin-bottom: 24px;
}

.sidebar-group-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 12px;
  margin-bottom: 8px;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  font-size: 14px;
  color: #94A3B8;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.04);
}

.sidebar-link.active {
  color: #A5B4FC;
  background: rgba(99, 102, 241, 0.1);
  font-weight: 500;
}

.sidebar-footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.github-docs-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748B;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

.github-docs-link:hover {
  color: #818CF8;
  background: rgba(99, 102, 241, 0.06);
}

.docs-content {
  min-height: 60vh;
}

.docs-card {
  padding: 32px;
}

@media (min-width: 768px) {
  .docs-card {
    padding: 48px;
  }
}

.docs-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.docs-title {
  font-size: 30px;
  font-weight: 700;
  color: white;
}

.docs-intro {
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.docs-text {
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 14px;
}

.docs-h2 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 32px 0 16px;
}

.table-wrap {
  overflow-x: auto;
  margin-bottom: 32px;
}

.docs-table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}

.docs-table th {
  text-align: left;
  padding: 12px 16px;
  color: #94A3B8;
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.docs-table td {
  padding: 12px 16px;
  color: #94A3B8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.component-name {
  color: white !important;
  font-weight: 500;
}

.version-tag {
  color: #6EE7B7;
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.code-block {
  background: #1E1E2E;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 24px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.code-lang {
  font-size: 12px;
  color: #64748B;
  font-family: monospace;
}

.copy-code-btn {
  padding: 4px;
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  transition: color 0.2s;
}

.copy-code-btn:hover {
  color: white;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

.code-block code {
  font-size: 14px;
  color: #6EE7B7;
  line-height: 1.6;
}

.comment {
  color: #64748B;
}

.tip-box {
  padding: 20px;
  border-left: 4px solid #6366F1;
  font-size: 14px;
  color: #94A3B8;
}

.tip-label {
  color: #A5B4FC;
}

.deploy-steps {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.8;
  margin-bottom: 24px;
}

.deploy-steps li::marker {
  color: #818CF8;
  font-weight: 600;
}

.deploy-steps strong {
  color: white;
}

.inline-code {
  color: #6EE7B7;
  background: rgba(16, 185, 129, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

.feature-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-list li {
  padding-left: 20px;
  position: relative;
}

.feature-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #818CF8;
  font-weight: 700;
}

.feature-list li strong {
  color: white;
}

/* RAG 架构流程 */
.architecture-flow {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: border-color 0.2s;
}

.flow-step:hover {
  border-color: rgba(99, 102, 241, 0.3);
}

.flow-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  background: rgba(99, 102, 241, 0.15);
  color: #A5B4FC;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
}

.flow-content strong {
  color: white;
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.flow-content p {
  color: #94A3B8;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}

/* 文档格式标签 */
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.doc-tag {
  padding: 6px 14px;
  background: rgba(99, 102, 241, 0.1);
  color: #A5B4FC;
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-family: monospace;
}

/* API 接口样式 */
.api-endpoint {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.api-method {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  font-family: monospace;
  text-transform: uppercase;
}

.api-method.get {
  background: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
}

.api-method.post {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
}

.api-method.delete {
  background: rgba(239, 68, 68, 0.15);
  color: #F87171;
}

.api-path {
  color: #6EE7B7;
  font-size: 14px;
}
</style>
