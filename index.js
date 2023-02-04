import express from "express";

const app = express();
const PORT = 4000;

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.get(
  "/",
  (req, res, next) => {
    console.log("A");
    next();
  },
  (req, res, next) => {
    console.log("B");
    return next(new ErrorHandler("not foundd", 404));
  },
  (req, res, next) => {
    console.log("C");
  }
);

app.use((err, req, res, next) => {
  err.message = err.message || "Internal server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    message: err.message,
  });
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
