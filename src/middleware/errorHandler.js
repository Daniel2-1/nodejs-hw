import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res) => {
  console.log(err.message);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
