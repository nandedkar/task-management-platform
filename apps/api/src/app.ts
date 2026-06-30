import express from 'express';

// import healthRoutes from './modules/health/health.route';
import { requestLogger } from './common/middleware/requestLogger';
import { errorHandler } from './common/middleware/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(requestLogger);
app.use(routes);
// app.use('/health', healthRoutes);
app.use(errorHandler);

export default app;
