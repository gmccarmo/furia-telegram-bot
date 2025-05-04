const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const {
  getRanking,
  getLineup,
  getLastMatches,
  getUpcomingEvents
} = require('../services/furiaService');

const token = '7878779587:AAEOyiZQddhSTbLCllXH-k6lpQD2HvbhZ34'; // substitua pelo seu token real
const bot = new TelegramBot(token, { polling: true });

const userState = {};

bot.onText(/\/start|oi|Oi/i, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Fala torcedor Furioso! Como posso te chamar?");
  userState[chatId] = { step: 'getName' };
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text || msg.text.startsWith('/')) return;

  if (userState[chatId]?.step === 'getName') {
    const name = msg.text.trim();
    userState[chatId] = { name, step: 'main' };

    bot.sendMessage(chatId, `Prazer ${name}!😎\nGostaria de saber mais sobre a FURIA CS? 👀`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Sim", callback_data: "info" },
            { text: "Não", callback_data: "encerrar" }
          ]
        ]
      }
    });
  }
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Responde à ação de callback
  bot.answerCallbackQuery(query.id);

  // Indicação visual de carregamento
  await bot.sendMessage(chatId, '⏳ Carregando...');

  // Aguarda 1 segundo antes de continuar
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (data === "info") {
    return bot.sendMessage(chatId, `Sobre o que gostaria de saber? 🤔`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Posição no ranking 📊", callback_data: "ranking" }],
          [{ text: "Lineup atual 👥", callback_data: "lineup" }],
          [{ text: "Últimas partidas 📉", callback_data: "ultimas_partidas" }],
          [{ text: "Próximos campeonatos 🗞️", callback_data: "proximos_campeonatos" }],
          [{ text: "Encerrar conversa 😶‍🌫️", callback_data: "encerrar" }]
        ]
      }
    });
  }

  if (data === "ranking") {
    const rank = await getRanking();
    return bot.sendMessage(chatId, `📊 Ranking atual da FURIA: ${rank}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Lineup atual 👥", callback_data: "lineup" }],
          [{ text: "Últimas partidas 📉", callback_data: "ultimas_partidas" }],
          [{ text: "Próximos campeonatos 🗞️", callback_data: "proximos_campeonatos" }],
          [{ text: "Encerrar conversa 😶‍🌫️", callback_data: "encerrar" }]
        ]
      }
    });
  }

  if (data === "lineup") {
    const lineup = await getLineup();
    await bot.sendMessage(chatId, `👥 Lineup atual da FURIA:\n${lineup}`);

    bot.sendMessage(chatId, "Escolha outra opção:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Posição no ranking 📊", callback_data: "ranking" }],
          [{ text: "Últimas partidas 📉", callback_data: "ultimas_partidas" }],
          [{ text: "Próximos campeonatos 🗞️", callback_data: "proximos_campeonatos" }],
          [{ text: "Encerrar conversa 😶‍🌫️", callback_data: "encerrar" }]
        ]
      }
    });
  }

  if (data === "ultimas_partidas") {
    const matches = await getLastMatches();
    await bot.sendMessage(chatId, `📉 Últimas partidas da FURIA:\n${matches}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Posição no ranking 📊", callback_data: "ranking" }],
          [{ text: "Lineup atual 👥", callback_data: "lineup" }],
          [{ text: "Próximos campeonatos 🗞️", callback_data: "proximos_campeonatos" }],
          [{ text: "Encerrar conversa 😶‍🌫️", callback_data: "encerrar" }]
        ]
      }
    });
  }

  if (data === "proximos_campeonatos") {
    const msg = await getUpcomingEvents();
    await bot.sendMessage(chatId, `🗞️ Próximos campeonatos da FURIA:\n${msg}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Posição no ranking 📊", callback_data: "ranking" }],
          [{ text: "Lineup atual 👥", callback_data: "lineup" }],
          [{ text: "Últimas partidas 📉", callback_data: "ultimas_partidas" }],
          [{ text: "Encerrar conversa 😶‍🌫️", callback_data: "encerrar" }]
        ]
      }
    });
  }

  if (data === "encerrar") {
    return bot.sendMessage(chatId, "Te vejo na próxima furioso!😎\nCaso precise, é só mandar um 'oi' que estarei na ativa.🫡");
  }
});

