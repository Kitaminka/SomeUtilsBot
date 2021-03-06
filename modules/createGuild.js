module.exports = async (client, guild) => {
    const Server = client.models.Server;
    try {
        const data = await Server.findOne({
            id: guild.id,
        });
        if (!data) {
            await new Server({
                prefix: client.config.defaultPrefix,
                id: guild.id,
            }).save();
        }
    } catch (err) {
        console.error(err);
    }
}