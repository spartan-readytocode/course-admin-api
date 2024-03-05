import dotenv from 'dotenv'
import ConnectDb from './Db/index.js'
dotenv.config({
    path: './.env'
})
ConnectDb()