import { setTimeout } from 'timers/promises';

import * as fs from 'fs';
const invalidNames = JSON.parse(fs.readFileSync('data/invalid_names.json').toString());
const invalidWords = JSON.parse(fs.readFileSync('data/invalid_words.json').toString());

const lastSendTime = {};

export async function manageMessage(message)
{
    for (let word of invalidWords)
    {
        if (message.content.includes(word))
        {
            message.delete();
            const reply = await message.channel.send('無効なワードが含まれています。');
            await setTimeout(1000 /*ms*/);
            await reply.delete();
            break;
        }
    }
    for (let name of invalidNames)
    {
        if (message.author.tag.includes(name) || message.author.username.includes(name))
        {
            message.delete();
            const reply = await message.channel.send('無効な名前が含まれています。');
            await setTimeout(1000 /*ms*/);
            await reply.delete();
            break;
        }
    }

    if (lastSendTime[message.channel.id])
    {
        if (Date.now() - lastSendTime[message.channel.id][message.author.id] <= 1000 /*ms*/)
        {
            try
            {
                await message.delete();
                message.author.send('連続してコメントできるのは1秒間隔です。');
            } catch (e)
            {
                console.log(e);
            }
        }
        lastSendTime[message.channel.id][message.author.id] = Date.now();
    } else
    {
        lastSendTime[message.channel.id] = {};
        lastSendTime[message.channel.id][message.author.id] = Date.now();
    }
}