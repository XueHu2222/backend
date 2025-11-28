// apigateway/routes/index.ts
import Express, { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router: Router = Express.Router();

// 用户认证服务代理 (端口3012)
const authProxy = createProxyMiddleware({
  target: 'http://localhost:3012/auth',
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(`[API Gateway] Proxying ${req.method} ${req.originalUrl} to auth service`);
    },
    proxyRes: (proxyRes, req, res) => {
      console.log(`[API Gateway] Auth service response: ${proxyRes.statusCode}`);
    },
    error: (err, req, res) => {
      console.error('[API Gateway] Auth proxy error:', err.message);
    }
  }
});

// 任务服务代理 (端口3010)
const taskProxy = createProxyMiddleware({
  target: 'http://localhost:3010/tasks',
  changeOrigin: true,
});

router.use('/tasks', taskProxy);
router.use('/auth', authProxy);

export default router;
