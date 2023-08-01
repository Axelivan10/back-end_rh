import express from 'express';
import bcrypt from 'bcrypt'
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import {Routes} from '../routes/routes.js';
import {Database} from './database.js';
import { Telegraf } from 'telegraf';


dotenv.config();

class App {
    app = express.application
    http = null;
    bot = null;
    routes = new Routes();
    db = new Database();


    constructor(){
        this.initializeApp()
    }

    async initializeApp() {
        this.app = express();
        this.config();
        this.http = http.createServer(this.app);
        await this.initDatabase();
        this.routes.initRoutes(this.app);
        this.bot = new Telegraf(process.env.BOT_TOKEN);
        await this.initBotListening(this.bot);
        
    }

    config(){
        this.app.use(
            express.urlencoded({
                extended: true
            })
        )
        this.app.use(express.json())
        this.app.use(cors({origin: '*'}))
    }

    async initDatabase(){
        const conection = await this.db.connection();
        console.log(conection.message)

    }

    async initBotListening(bot){
        bot.on('text',async(ctx)=>{
            console.log('text', ctx.message.text);
            ctx.Telegram.sendMessage(ctx.message.chat.id,`hello ${ctx.state.role}`)

            ctx.reply(`hello ${ctx.state.role}`)

        });
    }

}

export default new App();