import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';
import { setTimeout } from 'timers/promises';

export async function perseCommand(message)
{
    if (message.content.includes('!'))
    {
        if (message.member.permissions.has('ADMINISTRATOR'))
        {
            if (message.content.includes('!ping'))
            {
                message.channel.send('pong!');
            }
            if (message.content.includes('!test'))
            {
                message.channel.send('OK');
            }
            if (message.content.startsWith('!dc'))
            {
                try
                {
                    let args = message.content.split(' ').slice(1).join('');
                    args = parseInt(args) || 1;
                    let messages = await message.channel.messages.fetch({ limit: 100 });
                    const size = messages.size;
                    if (args > size)
                    {
                        args = size;
                    }
                    if (args >= 0 && args <= 99)
                    {
                        let nowTime = new Date();
                        messages = await message.channel.messages.fetch({ limit: args + 1 });
                        const filtered = messages.filter(msg => ((nowTime - msg.createdAt) / 1000 / 60 / 60 / 24 / 7) < 1);
                        message.channel.bulkDelete(filtered);
                    }
                }
                catch (error)
                {
                    console.error(error);
                    const reply = await message.channel.send('dc コマンドエラー');
                    await setTimeout(5000 /*ms*/);
                    await reply.delete();
                }
            }
            if (message.content.startsWith('!createfirstrolecomment'))
            {
                message.channel.send(
                    {
                        embeds: [new EmbedBuilder()
                            .setTitle('自分に合ったロールを付与してね。')
                            .setFields(
                                {
                                    name: 'NormalMember',
                                    value: '雑談やYouTubeの配信状況などのみ取得可能。'
                                },
                                {
                                    name: 'AddonCreator',
                                    value: 'アドオンについての情報などを共有するチャンネルを使用可能。'
                                })],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('setNormalMemberRoleButton')
                                    .setLabel('NormalMember')
                                    .setStyle(ButtonStyle.Primary),
                                new ButtonBuilder()
                                    .setCustomId('setAddonCreatorRoleButton')
                                    .setLabel('AddonCreator')
                                    .setStyle(ButtonStyle.Primary),
                                new ButtonBuilder()
                                    .setCustomId('removeAllRoleButton')
                                    .setLabel('RemoveRole')
                                    .setStyle(ButtonStyle.Primary))
                        ]
                    });
                message.delete();
            }
        }
    }
}