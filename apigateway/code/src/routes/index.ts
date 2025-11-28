import Express, { NextFunction, Request, Response, Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import type { Filter, Options, RequestHandler } from 'http-proxy-middleware';
import { authenticateToken } from '../middleware/authentication/authenticate.ts';
const router: Router = Express.Router();


// create a proxy for each microservice
// add the on: { proxyReq: fixRequestBody } to fix the body issue with POST/PUT requests
// see https://www.npmjs.com/package/http-proxy-middleware#intercept-and-manipulate-requests
const clientProxyMiddleware = createProxyMiddleware<Request, Response>({
  target: 'http://clients:3012/owners',
  on: {
    proxyReq: fixRequestBody,
  },
  changeOrigin: true
});

const appointmentProxyMiddleware = createProxyMiddleware<Request, Response>({
  target: 'http://appointments:3010/api/v1/appointments',
  on: {
    proxyReq: fixRequestBody,
  },
  changeOrigin: true
});

const timeslotProxyMiddleware = createProxyMiddleware<Request, Response>({
  target: 'http://appointments:3010/api/v1/timeslots',
  on: {
    proxyReq: fixRequestBody,
  },
  changeOrigin: true
});


router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('hi');
  next();
});
// router.use('/appointments', appointmentProxy);
router.use('/owners', authenticateToken, clientProxyMiddleware);
router.use('/appointments', appointmentProxyMiddleware);
router.use('/timeslots', timeslotProxyMiddleware);

export default router;
