const base = {
	client: "pg",
	connection: null,
	useNullAsDefault: true,
	migrations: {
		directory: "./database/migrations",
	},
	seeds: {
		directory: "./database/seeds",
	},
};

module.exports = {
	development: {
		...base,
		connection: process.env.DATABASE_URL_DEV,
	},
	testing: {
		...base,
		connection: process.env.DATABASE_URL_TEST,
	},
	production: {
		...base,
		connection: process.env.DATABSE_URL,
	},
};
