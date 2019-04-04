// creo constante con los dos entornos
const environments = {
  "production": 'production',
  "development": 'development'
};

const ENV = process.env.NODE_ENV || environments.development;

const config = {
  [environments.production]: {
    PORT: 80
  },
  [environments.development]: {
    PORT: 8080
  }
};

const CONFIG = config[ENV];

if (!CONFIG) throw new Error(`Invalid NODE_ENV=${ENV}`);

process.env = {
  ...process.env,
  ...CONFIG
};
