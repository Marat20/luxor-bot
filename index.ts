import 'dotenv/config';
import { Workbook } from 'exceljs';
import * as TelegramBot from 'node-telegram-bot-api';
import { getDateFromTimestamp } from './config/dateToTimestamp';
import { writeToExcel } from './config/excel';
import { getQuery } from './config/graphql';
import { getMakers } from './config/query';
import { IMaker } from './config/types';

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_KEY!, {
  polling: true,
});

bot.on('text', async (msg) => {
  try {
    if (msg.text?.startsWith('/start')) {
      await bot.sendMessage(msg.chat.id, `Вы запустили бота!`);
    }
  } catch (error) {
    console.log(error);
  }
});

bot.onText(/\/wallet/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Введите адрес торговой пары токена');
  bot.once('message', async (msg) => {
    let wallet = msg.text;
    if (wallet?.startsWith('/')) return;
    await bot.sendMessage(
      chatId,
      'Старт транзакций (например 20.10.2023 17:00)',
    );
    bot.once('message', async (msg) => {
      if (msg.text?.startsWith('/')) return;

      const startTransaction = getDateFromTimestamp(msg.text as string);

      await bot.sendMessage(chatId, 'Конец транзакций');
      bot.once('message', async (msg) => {
        if (msg.text?.startsWith('/')) return;

        const workbook = new Workbook();

        const worksheet = workbook.addWorksheet('My Sheet');

        const finishTransaction = getDateFromTimestamp(msg.text as string);

        if (!startTransaction || !finishTransaction || !wallet) {
          return;
        }

        const query = getMakers({
          wallet,
          startTransaction,
          finishTransaction,
        });

        const makers: IMaker[] = await getQuery(query);

        const set = new Set<string>();

        makers.forEach((element) => {
          set.add(element.maker);
        });

        await writeToExcel(set, workbook, worksheet);

        setTimeout(() => {
          bot.sendDocument(msg.chat.id, './myFile.xlsx');
        }, 500);
      });
    });
  });
});
