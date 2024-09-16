const telegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN as string,
  chatId: process.env.TELEGRAM_CHAT_ID as string,
};

export default telegramConfig;