import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { randomInt } from 'node:crypto' // min <= n < max
import dotenv from 'dotenv'

dotenv.config()

const { BOT_TOKEN } = process.env

if (!BOT_TOKEN) {
  throw 'Добавьте BOT_TOKEN в .env'
}

const userNumber: { [key: number]: number } = {}
const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))

let randomNumber = randomInt(1, 10 + 1)

// 3
// 1 2 ... 10
// 3 -> 1

bot.on(message('text'), async (ctx) => {
  const chatId = ctx.message.chat.id
  ctx.chat.id
  const n = Number(ctx.message.text)
  if (n === randomNumber) {
    randomNumber = randomInt(1, 10 + 1)
    userNumber[chatId] = randomNumber
    await ctx.reply('Ты угадал')
  } 
  else if (n < randomNumber) {
    ctx.reply('Мое число больше.');
  } else {
    ctx.reply('Мое число меньше.');
  }
})

bot.launch(() => {
  console.log('Bot started 🚀')
})
