import dotenv from 'dotenv';
dotenv.config();

import * as discordjs from 'discord.js';
// import * as cron from 'node-cron';
// import * as fs from 'fs';

import * as commands from './commands/commands.js';
import * as messageManage from './events/client/message-manage.js';
import * as memberManage from './events/client/member-manage.js';
// import * as connectServer from './events/server/connect-server.js';
import * as interactionManage from './events/client/interaction-manage.js';

// const commandsData = JSON.parse(fs.readFileSync('/json_data/commands.json').toString());

// let isServerOnline = false;

const discordClient = new discordjs.Client(
    {
        intents: [
            discordjs.GatewayIntentBits.Guilds,
            discordjs.GatewayIntentBits.GuildMessages,
            discordjs.GatewayIntentBits.GuildMembers,
            discordjs.GatewayIntentBits.MessageContent,
            discordjs.GatewayIntentBits.DirectMessages
        ],
        partials: [
            discordjs.Partials.Channel
        ]
    });

discordClient.on('ready', async () =>
{
    console.log('bot is ready');
});

discordClient.on('messageCreate', async message =>
{
    if (!message.author.bot)
    {
        messageManage.manageMessage(message);
        commands.perseCommand(message);
    }
});

discordClient.on('guildMemberAdd', async member =>
{
    memberManage.serverIn(member);
});

discordClient.on('guildMemberRemove', async member =>
{
    memberManage.serverOut(member);
});

discordClient.on("interactionCreate", async interaction =>
{
    interactionManage.parseInteraction(interaction);
});

discordClient.login(process.env.BOT_TOKEN);

// cron.schedule('*/30 * * * * *', () =>
// {
//     connectServer.sendPingOldPre17();
//     if (connectServer.isServerOnline())
//     {
//         connectServer.sendPing();
//         if (!isServerOnline)
//         {
//             try
//             {
//                 //let user = discordClient.users.cache.get();
//                 //user.send('Tani家サーバーは現在オンラインです。');
//                 console.log('tanike server is online now.');
//                 isServerOnline = true;
//             }
//             catch (e)
//             {
//                 console.log(e);
//             }
//         }
//     }
//     else if (isServerOnline)
//     {
//         isServerOnline = false;
//         //let user = discordClient.users.cache.get();
//         //user.send('Tani家サーバーは現在オンラインです。');
//         console.log('tanike server is offline now.');
//     }
//     console.log(connectServer.getServerInfo());
//     console.log(connectServer.getServerInfoDetail());
// });