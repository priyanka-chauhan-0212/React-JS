const app = require('./app');
let db = require('./models');

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Uncaught Exception`);
	process.exit(1);
});

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config({ path: './config/config.env' });
}

const server = db.sequelize
	.sync({ force: false, logging: false })
	.then((res) => {
		app.listen(process.env.PORT, async () => {
			// await db.authenticate();
			console.log(
				`Server is working on http://localhost:${process.env.PORT}`
			);
		});
	});

// * Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);
	server.close(() => {
		process.exit(1);
	});
});
