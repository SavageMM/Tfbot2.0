const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/levels")
const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    // filter alleen js files
    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        HTMLFormControlsCollection.log("Can't find any file's");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is loaded and ready!`);

        bot.commands.set(fileGet.help.name, fileGet);

    });

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("Getting Created by my dad luuk", { type: "WATCHING" });

});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);
    /* ============================================================================================================================================================*/
    /* ============================================================================================================================================================*/
    /* =================================================     Level system voor the fatals bot            ==========================================================*/
    /* ============================================================================================================================================================*/
    /* ============================================================================================================================================================*/

    var randomXp = Math.floor(Math.random(1) * 15 + 1)
    console.log(`${randomXp} er bij`)
    var idUser = message.author.id

    if (!levelFile[idUser]) {

        levelFile[idUser] = {

            xp: 0,
            level: 1

        }

    }

    levelFile[idUser].xp += randomXp;
    if (nextLevelXp === 0) nextLevel = 100;
    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp; 
    var nextLevelXp = levelUser * 300;
    var user = message.author.username

    


    if (xpUser >= nextLevelXp) {

        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {

            if (err) console.log(err);

        });
        var newLevel = levelFile[idUser].level

        var embedLevel = new discord.RichEmbed()
            .setDescription(`**${user} Just went a level up!**`)
            .setThumbnail(message.author.displayAvatarURL)
            .setColor("03adfc")
            .addField("New level:", newLevel)
            .addField("XP",`${xpUser}*** / ***${nextLevelXp}`)
            
            message.channel.send(embedLevel);


    }
    if (newLevel == 5) {
        
        var level5 = message.guild.roles.get("668782676450213893");
        message.member.addRole(level5);
        

        console.log(`Gedaan!`)
    }

    if (newLevel == 5 ){
        var level1 = message.guild.roles.get("668782514168528898");
        message.member.removeRole(level1);
    }

    if (newLevel == 10) {
        
        var level10 = message.guild.roles.get("668782816867254282");
        message.member.addRole(level10);


        console.log(`Gedaan!`)
    }

    if (newLevel == 10 ){
        var level5 = message.guild.roles.get("668782676450213893");
        message.member.removeRole(level5);
    }

    if (newLevel == 20) {
        
        var level20 = message.guild.roles.get("668782936962629632");
        message.member.addRole(level20);


        console.log(`Gedaan!`)
    }

    if (newLevel == 20 ){
        var level10 = message.guild.roles.get("668782816867254282");
        message.member.removeRole(level10);
    }

    if (newLevel == 30) {
        
        var level30 = message.guild.roles.get("668783509057437697");
        message.member.addRole(level30);


        console.log(`Gedaan!`)
    }

    if (newLevel == 30 ){
        var level20 = message.guild.roles.get("668782936962629632");
        message.member.removeRole(level20);
    }

    if (newLevel == 50) {
        
        var level50 = message.guild.roles.get("668783748879220755");
        message.member.addRole(level50);


        console.log(`Gedaan!`)
    }

    if (newLevel == 50 ){
        var level30 = message.guild.roles.get("668783509057437697");
        message.member.removeRole(level30);
    }

    if (newLevel == 75) {
        
        var level75 = message.guild.roles.get("668783885802405928");
        message.member.addRole(level75);


        console.log(`Gedaan!`)
    }

    if (newLevel == 75 ){
        var level50 = message.guild.roles.get("668783748879220755");
        message.member.removeRole(level50);
    }
    
    if (newLevel == 100) {
        
        var level100 = message.guild.roles.get("668784153277235200");
        message.member.addRole(level100);


        console.log(`Gedaan!`)
    }

    if (newLevel == 100 ){
        var level75 = message.guild.roles.get("668783885802405928");
        message.member.removeRole(level75);
    }

    if (newLevel == 150) {
        
        var level150 = message.guild.roles.get("668784305975066635");
        message.member.addRole(level150);


        console.log(`Gedaan!`)
    }

    if (newLevel == 150 ){
        var level100 = message.guild.roles.get("668784153277235200");
        message.member.removeRole(level100);
    }

});
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
/* =================================================     lOG VOOR DELETED MESSAGE THE FATALS BOT!    ==========================================================*/
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
bot.on("messageDelete", async (messageDelete) => {

    var userIcon = messageDelete.author.displayAvatarURL
    var userSended = messageDelete.author.tag
    var deletedIn = messageDelete.channel
    var messageDel = messageDelete.content
    var delTime = messageDelete.createdAt

    var deletedMessage = new discord.RichEmbed()
        .setTitle("Removed Message")
        .setThumbnail(userIcon)
        .setColor("03adfc")
        .setDescription(`**Message sent by __${userSended}__ deleted in "${deletedIn}" **`)
        .addField("**Message:**", ` **${messageDel}** `)
        .addField("Deleted on", delTime)

    var logChannel = messageDelete.guild.channels.find(`name`, "mod-log");

    if (!logChannel) return message.guild.send("Code 606 @ SavageMM");

    logChannel.send(deletedMessage);
    console.log(`${messageDelete.author.tag} deleted message "${messageDelete.content}" `)
    return;
});
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
/* =================================================       AUTO ROLE WHEN PLAYER JOINS DIDCORD       ==========================================================*/
/* ============================================================================================================================================================*/
/* ============================================================================================================================================================*/
bot.on('guildMemberAdd', member => {
    console.log('User' + member.user.tag + 'has joined the server!');
  
    var level1 = member.guild.roles.get("668782514168528898");
    member.addRole(level1);
  
});

bot.login(process.env.token);