module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: 'notes',
  synchronize: true,
  logging: true,
  // url: process.env.DATABASE_URL,
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
  entities: ['build/entity/*.js'],
  migrations: ['build/migration/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}
