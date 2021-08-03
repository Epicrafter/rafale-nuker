const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { cyan } = require('chalk');

const settings = require('./settings.json');
const re = require('./assets/messages/returnMessages.json');

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.categories = fs.readdirSync('./commands/');

["command"].forEach(handler => {
    require(`./handler/command.js`)(client);
});

const ascii = String.raw`


                    ██▀███   ▄▄▄        █████▒▄▄▄       ██▓    ▓█████ 
                    ▓██ ▒ ██▒▒████▄    ▓██   ▒▒████▄    ▓██▒    ▓█   ▀ 
                    ▓██ ░▄█ ▒▒██  ▀█▄  ▒████ ░▒██  ▀█▄  ▒██░    ▒███   
                    ▒██▀▀█▄  ░██▄▄▄▄██ ░▓█▒  ░░██▄▄▄▄██ ▒██░    ▒▓█  ▄ 
                    ░██▓ ▒██▒ ▓█   ▓██▒░▒█░    ▓█   ▓██▒░██████▒░▒████▒
                    ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ▒ ░    ▒▒   ▓▒█░░ ▒░▓  ░░░ ▒░ ░
                    ░▒ ░ ▒░  ▒   ▒▒ ░ ░       ▒   ▒▒ ░░ ░ ▒  ░ ░ ░  ░
                    ░░   ░   ░   ▒    ░ ░     ░   ▒     ░ ░      ░   
                    ░           ░  ░             ░  ░    ░  ░   ░  ░

                    By Epicrafter#4261
                                                   

`;

client.on('ready', () => {
    
    console.log(cyan(ascii));
    console.log(cyan(`                    Logged in as: ${client.user.username}#${client.user.discriminator}`));
    console.log(cyan(`                    Bot prefix: ${settings.prefix}`));
    console.log(cyan(`                    Bot Status: ${settings.status}`));
    console.log(``);
    console.log(cyan(`                    Please check this console if any errors occur`));

    client.user.setActivity({ type: 'PLAYING', name: settings.status })

})

client.on('message', async (message) => {

    let prefix = settings.prefix;

    let embed = new MessageEmbed()
    .setColor(settings.color)
    
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) return message.channel.send("This command doesn't exist");

    // This part will:
    // - check if the user is the owner of the bot
    // - check if the bot has the required permissions on the server

    let unauthorized = message.author.id == settings.id;

    if(!unauthorized) {

        embed.addField('Unauthorized Access', re.not_owner)
        return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })})

    }

    if(!message.guild.me.hasPermission("ADMINISTRATOR")) {

        embed.addField('Missing Permission', re.not_admin)
        return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })})

    }

    //

    if(command) command.run(client, message, args);

});

client.login(settings.token)