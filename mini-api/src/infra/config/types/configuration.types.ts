export interface Configuration {
  database: DatabaseConfig;
}

export interface DatabaseConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}
