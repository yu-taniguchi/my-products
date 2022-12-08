import { setTimeout } from 'timers/promises';

import * as fs from 'fs';
const invalidNames = JSON.parse(fs.readFileSync('data/invalid_names.json').toString());

export async function serverIn(member)
{
    const channel = member.guild.channels.cache.get('709650604448022599');
    if (!channel)
    {
        console.log('チャンネルが見つかりません。');
        return;
    }
    for (let name of invalidNames)
    {
        if (member.user.tag.includes(name) || member.user.username.includes(name))
        {
            member.send('不正な名前でのアクセスです。');
            channel.send(`ブラックリストに登録されている${member.user.username}が入ろうとしたためキックしました。`);
            await setTimeout(1000);
            await member.kick();
            return;
        }
    }
    channel.send(`${member.user.username}が参加しました。`);
    try
    {
        member.roles.add('703102078578458705');
    } catch
    {
        console.log('新規参加時にロールが付与できませんでした。');
    }
}

export async function serverOut(member)
{
    const channel = member.guild.channels.cache.get('709650604448022599');
    if (!channel)
    {
        console.log('チャンネルが見つかりません。');
        return;
    }
    channel.send(`${member.user.username}がどこかへ消えていきました。`);
}