 /// Creamos una carpeta llamada interactions
/// Dentro de la carpeta creamos un archivo llamado ticket-create y agregamos
const Discord = require('discord.js');

const guildTicketCategoryId = 'COLOCAR EL ID DE  LA CATEGORIAS DE TICKET!';
const moderationRole = 'COLOCAR EL ID DEL ROL DE MODERACION';

const ticketCloseButton = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
    .setCustomId('ticket-close')
    .setLabel('Close Ticket')
    .setStyle('2')
    .setEmoji('🔒'),

    new Discord.ButtonBuilder()
    .setEmoji('📑')
    .setStyle('2')
    .setCustomId('transcript')
)

async function main (interaction) {
    const {user, guild} = interaction;
    const ticketType = interaction.values[0];

    const tickets = guild.channels.cache.filter(channel => channel.parentId === guildTicketCategoryId);
    if(tickets.some(ticket => ticket.topic === user.id)) return interaction.reply({content: 'Tienes un ticket abierto!.', ephemeral: true})

	const imageUrl = ''

    const embed = {
        title: 'Ticket System',
        description: ` Bienvenido ${user},\n\nEspera que un staff atienda el ticekt.\nSi pasaron mas de 5 minutos y nadie te atendio puedes taguear a algun staff.`,
		color: 0x5BFF8A,
    }
    // Creacion de ticket
    interaction.reply({content: 'Su ticket se esta creando...', ephemeral: true})
    .then(() => {
        guild.channels.create({
            name: ticketType+'-'+user.username.slice(0, 25-ticketType.length),
            topic: user.id,
            type: Discord.ChannelType.GuildText,
            parent: guildTicketCategoryId,
            permissionOverwrites: [
                {id: interaction.guild.roles.everyone, deny: [Discord.PermissionsBitField.Flags.ViewChannel]},
                {id: moderationRole, allow: [Discord.PermissionsBitField.Flags.ViewChannel]},
                {id: interaction.user.id, allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]},
                      ]
        }).then(channel => {
            interaction.editReply({content: `- Ticket creado en: ${channel}`});

            channel.send({
                content: `@everyone`,
                embeds: [embed],
                components: [ticketCloseButton]
            });
        });
        
    });

};

module.exports = main;
