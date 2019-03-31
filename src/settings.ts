declare function require(name: string): any;

const dotenv: any = require('dotenv');

dotenv.config();

export const ROOT: string = process.env.ROOT;
export const PORT: string = process.env.PORT;
export const JWT_KEY: string = process.env.JWT_KEY;
export const ATLAS_URL: string = process.env.ATLAS_URL;
