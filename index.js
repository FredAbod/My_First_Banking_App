const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const morgan = require('morgan');
const walletRoutes = require( './routes/wallet.routes');
const transactionRoutes = require( './routes/transaction.routes');
const userRoutes = require( './routes/user.routes');
const adminRoutes = require( './routes/admin.routes');

const app = express();
app.use(express.json());if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallets', walletRoutes);
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB');
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});