const { MessageEmbed } = require('discord.js');
const settings = require('../../settings.json');

module.exports = {
    "name": "cc",
    "category": "channel",
    "description": "Mass creates channels",
    "usage": "cc <channel_name>",
    run: async (client, message, args) => {

        message.delete();

        let error = new MessageEmbed()
        .setColor(settings.color)

        let channelName = args.join(' ');
        
        if(!channelName) {

            error.addField('Missing Argument', 'Please provide a channel name')

            return message.channel.send(error).then(msg => msg.delete({ timeout: 5000 }));

        }

        setInterval(() => {

            var i = 0; i < 250;

            message.guild.channels.create(channelName);

        }, 10);

    }
}  