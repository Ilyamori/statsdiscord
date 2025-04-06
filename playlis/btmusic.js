
// bot.js

const { Client, Intents } = require('discord.js');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, AudioResource } = require('@discordjs/voice');
const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');
const { AudioPlayer } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

// Список аудиофайлов для плейлиста
const playlist = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Пример MP3 URL
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
];

let currentTrackIndex = 0;

let connection;
let audioPlayer;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    // Игнорируем сообщения от бота
    if (message.author.bot) return;

    if (message.content === '!play') {
        // Вступаем в голосовой канал и начинаем воспроизведение
        if (message.member.voice.channel) {
            connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            // Запускаем первый трек
            playNextTrack();
        } else {
            message.reply("Ты должен быть в голосовом канале, чтобы я мог играть музыку!");
        }
    }

    if (message.content === '!next') {
        // Переключаемся на следующий трек в плейлисте
        playNextTrack();
    }

    if (message.content === '!skip') {
        // Пропускаем текущий трек и начинаем следующий
        audioPlayer.stop();
    }

    if (message.content === '!stop') {
        // Останавливаем воспроизведение и выходим из канала
        audioPlayer.stop();
        connection.destroy();
    }
});

// Функция для воспроизведения следующего трека
async function playNextTrack() {
    if (currentTrackIndex >= playlist.length) {
        currentTrackIndex = 0; // Перезапускаем плейлист
    }

    const trackUrl = playlist[currentTrackIndex];
    const resource = createAudioResource(trackUrl);
    audioPlayer = createAudioPlayer();

    // Начинаем воспроизведение трека
    audioPlayer.play(resource);

    // Подключаемся к голосовому каналу и запускаем воспроизведение
    connection.subscribe(audioPlayer);

    // После завершения трека, начинаем следующий
    audioPlayer.on(AudioPlayerStatus.Idle, () => {
        currentTrackIndex++;
        playNextTrack();
    });

    // Сообщаем, что трек начался
    console.log(`Now playing: ${trackUrl}`);
}

client.login('your-bot-token');  // Замените на токен вашего бота
