declare function require(moduleName: string): any;

const dotenv: any = require('dotenv');

dotenv.config();

export const ROOT = process.env.ROOT;
export const PORT = process.env.PORT;
export const JWT_KEY = process.env.JWT_KEY;
export const PASSWORD = process.env.ATLAS_PWD;
