import "dotenv/config";

const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL;
const URI = process.env.URI;
const SALT = process.env.SALT || 10;

export { NODE_ENV, DATABASE_URL, URI, SALT };
