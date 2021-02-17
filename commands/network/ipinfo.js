const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'ipinfo',
    description: 'Display information about IP address.',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No IP address specified.'));
        let embed, ipInfo;

        try {
            ipInfo = await fetch(`http://ip-api.com/json/${args[0]}`).then( res => res.json());
        } catch (err) {
            message.channel.send(await client.modules.errorEmbed(client, 'An error has occurred.'));
            return console.error(err);
        }

        if (ipInfo.status === 'success') {
            embed = new Discord.MessageEmbed()
                .setTitle(`IP address ${ipInfo.query} info`)
                .setColor(client.config.embedColor)
                .addField('Country', ipInfo.country)
                .addField('City', ipInfo.city)
                .addField('Latitude', ipInfo.lat)
                .addField('Longitude', ipInfo.lon)
                .addField('ISP', ipInfo.isp)
                .setImage(`https://static-maps.yandex.ru/1.x/?ll=${ipInfo.lon},${ipInfo.lat}&l=map&z=14`)
                .setTimestamp();
        } else {
            embed = await client.modules.errorEmbed(client, 'Entered incorrect IP address.')
        }
        return message.channel.send(embed);
    }
}