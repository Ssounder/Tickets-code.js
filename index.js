// Dependencias
const Discord = require('discord.js')
const {ActivityType} = require("discord.js");
const { EmbedBuilder,AttachmentBuilder, ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ModalBuilder,TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, Events, GatewayIntentBits, Partials  } = require('discord.js')
const { createTranscript } = require('discord-html-transcripts')
// Cliente
const Client = new Discord.Client({intents: 3276799});

  const embed = {
    title: 'Sistema de tickets',
    description: 'Abre un ticket',
    color: 0x5865F2,
    image: {url: 'https://cdn.discordapp.com/attachments/1123808888525955133/1207076372481314877/banner-de-soporte-sobre-patos-upscaled.jpg?ex=65de5479&is=65cbdf79&hm=ab2ffb86270805d9d45b3fffba7f1941caf965431644f7cbd2f23a89bf196ac0&'}
};
const menu = new Discord.ActionRowBuilder().addComponents(
    new Discord.StringSelectMenuBuilder()
         .setPlaceholder('Abre aqui')
         .setMaxValues(1)
         .setMinValues(1)
         .setCustomId('ticket-create')
         .setOptions([{
        label: 'Soporte',
        emoji: '👋',
        description: 'Open an Suppport Ticket',
        value: 'Soporte'
    }, {
        label: 'Reportes',
        emoji: '⚠️',
        description: 'Open an report Ticket',
        value: 'report'
    }])
)'
Client.on('ready', async (client) => {
    const ticketPanelChannelId = "PON LA ID DEL CANAL DONDE SE MANDARA EL PANEL"// id del canal
    client.channels.fetch(ticketPanelChannelId)
    .then(channel => channel.send({embeds: [embed], components: [menu]}))
});
// IMPORTANTE al mandarse el mensaje borrar todo lo de arriba solo dejar el Evento interaction create
/// Evento Interaction Create
Client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand()) return;
    try {
        const execute = require(`./interactions/${interaction.customId}`);
        execute(interaction);
    }
      catch (error) {
        console.log(error)
      }
  });
// Registro
Client.login("")
