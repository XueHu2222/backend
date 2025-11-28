// apigateway/start.ts
import Express, { Application, Request, Response, NextFunction } from 'express';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import IndexRouter from './routes/index.ts';
import { errorHandler } from './middleware/errors/errorHandler.ts';

const app: Application = Express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3011;

// 支持JSON和URL编码的请求体
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// 主路由
app.use('/', IndexRouter);

// 404处理器
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error('Resource not found', { cause: 404 });
  } catch (err) {
    next(err);
  }
});

// 错误处理器
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🍿 API Gateway running → PORT ${port}`);
});
