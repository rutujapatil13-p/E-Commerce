import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.sync({ force: true }); // Use force: false in production
    console.log('Product & Order Service database connected');
    app.listen(PORT, () => {
      console.log(`Product & Order Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();