const TelegramBot = require('node-telegram-bot-api');
const translate = require('@vitalets/google-translate-api');

// Ganti dengan token bot Anda
const token = 'TOKENBOT';

// Buat instance dari bot Telegram
const bot = new TelegramBot(token, {polling: true});

// Respon saat menerima pesan
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Pisahkan perintah dan teks yang akan diterjemahkan
    const command = text.split(' ')[0];
    const textToTranslate = text.split(' ').slice(1).join(' ');

    // Cek apakah perintah adalah /translate
    if (command === '/translate') {
        translate(textToTranslate, {to: 'id'}).then(res => {
            bot.sendMessage(chatId, res.text);
        }).catch(err => {
            console.error(err);
            bot.sendMessage(chatId, 'Terjadi kesalahan saat menerjemahkan.');
        });
    } else {
        bot.sendMessage(chatId, 'Gunakan perintah /translate diikuti dengan teks yang akan diterjemahkan.');
    }
});
