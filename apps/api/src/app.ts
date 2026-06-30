import express from 'express';

// import healthRoutes from './modules/health/health.route';
import { requestLogger } from './common/middleware/requestLogger';
import { errorHandler } from './common/middleware/errorHandler';
import routes from './routes';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { requestId } from './common/middleware/request-id';
import { notFoundHandler } from './common/middleware/not-found';

const app = express();

/* -------------------------------- */
/* Security Middleware              */
/* -------------------------------- */

app.use(helmet());
// app.use(cors());
app.use(cookieParser());

/* -------------------------------- */
/* Body Parser                      */
/* -------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------- */
/* Request ID                       */
/* -------------------------------- */

app.use(requestId);
app.use(requestLogger);

/* -------------------------------- */
/* Routes                           */
/* -------------------------------- */
app.use(routes);

/* -------------------------------- */
/* 404 Handler                      */
/* -------------------------------- */
app.use(notFoundHandler);

// app.use('/health', healthRoutes);
app.use(errorHandler);
export default app;
