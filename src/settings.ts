declare function require(name: string): any;

const dotenv = require('dotenv');

dotenv.config();

export const ROOT: string | void = process.env.ROOT;
export const PORT: string | void = process.env.PORT;
export const JWT_KEY: string | void = process.env.JWT_KEY;
export const ATLAS_URL: string | void = process.env.ATLAS_URL;
