export async function parseInteraction(interaction)
{
    if (interaction.customId === 'setNormalMemberRoleButton')
    {
        await interaction.member.roles.remove('703102078578458705');
        await interaction.member.roles.add('703100349166256219');
    }
    if (interaction.customId === 'setAddonCreatorRoleButton')
    {
        await interaction.member.roles.remove('703102078578458705');
        await interaction.member.roles.add('703100349166256219');
        await interaction.member.roles.add('901787080135409674');
    }
    if (interaction.customId === 'removeAllRoleButton')
    {
        await interaction.member.roles.remove('901787080135409674');
    }
    await interaction.reply(
        {
            content: 'チャンネルが増えていたら成功です。もし増えていないようでしたら鯖主までDMなどでお問い合わせください。',
            ephemeral: true
        });
}