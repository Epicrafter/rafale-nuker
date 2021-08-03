const { MessageEmbed } = require('discord.js');
const settings = require('../../settings.json');

module.exports = {
    "name": "cd",
    "category": "channel",
    "description": "Deletes all the channels in the server",
    "usage": "cd",
    run: async (client, message, args) => {

        message.delete();

        message.guild.channels.cache.forEach((channel) => channel.delete());

    }
}