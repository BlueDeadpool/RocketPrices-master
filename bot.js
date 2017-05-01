const Discord = require('discord.js');
const client = new Discord.Client
const fs = require('fs');

client.on('ready', () => {
    console.log('RocketPrices Bot by BlueDeadpool: Online');
    client.user.setGame("rocketprices.net", "http://twitch.tv/rocketprices", "1")

});

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith("!" + str);
}

var token = 'MzAxNzI2NDI0ODc4ODA5MDg4.C8_NYw.G61v_tLpCYXY4LAi4Zmax2fpe40';
client.login(token);


var channel = "296974752772259840";
var PC = "305357483247927297";
var PS4 = "305357524079476737";
var XBOX = "305357647094480896";

//Thanks to Tiemen for helping me with this one
client.on('guildMemberAdd', (m) => {
  if(m.guild.id === client.guilds.get("272114818264203264").id)
       client.channels.find('name', 'greetings').sendMessage(m.toString() + " *has joined!*");
});

client.on('guildMemberRemove', (m) => {
  if(m.guild.id === client.guilds.get("272114818264203264").id)
       client.channels.find('name', 'greetings').sendMessage(m.toString() + " *has left!*");
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/);
  const params = message.content.split(" ").slice(1);

  if(commandIs("ping", message)){
    message.channel.sendMessage('Pong!');
  }
  if(commandIs("announce", message)) {
		message.delete();
		if(!message.member.roles.has('272116029780393984')) return message.reply("you must be an admin to use this command.");
    client.channels.find('name', 'news').sendMessage('@everyone');
		let say = message.content.split(" ").slice(1).join(" ");
    const embed = new Discord.RichEmbed() // send embed of warning
    .setColor(3447003)
    .addField("New Announcement!", say)
    .setFooter(`Announcement by ${message.author.username}#${message.author.discriminator}`)
    return client.channels.find('name', 'news').sendEmbed(embed);
	}
  if(commandIs("oannounce", message)) {
    message.delete();
    if(!message.member.roles.has('301728941369065472')) return message.reply("you must be a Bot Coder to use this command.");
    let say = message.content.split(" ").slice(1).join(" ");
    const embed = new Discord.RichEmbed() // send embed of warning
    .setColor(3447003)
    .addField("New Announcement!", say)
    .setFooter(`Announcement by ${message.author.username}#${message.author.discriminator}`)
    return client.channels.find('name', 'bot_makers').sendEmbed(embed);
  }
  if(commandIs("ban ", message)) {
    if(message.member.roles.has("305387341332086794")){
      if(args.length === 1){
        message.channel.sendMessage('Please mention a valid user.');
      } else {
        message.guild.fetchMember(message.mentions.users.first()).then(member => {
          member.ban()
          message.channel.sendMessage('User successfully banned.');
          message.channel.sendMessage(`${message.mentions.users.first()} has been banned by ${message.author}.`);
          client.channels.find('name', 'greetings').sendMessage(`${message.mentions.users.first()} has been banned by ${message.author}.`);
        })
      }
      } else {
        message.reply('you must be Staff to do this!');
      }
    }
  if(commandIs("kick ", message)) {
    if(message.member.roles.has("305387341332086794")){
      if(args.length === 1){
        message.channel.sendMessage('Please mention a valid user.');
      } else {
        message.guild.fetchMember(message.mentions.users.first()).then(member => {
          member.kick()
          message.channel.sendMessage('User successfully kicked.');
          message.channel.sendMessage(`${message.mentions.users.first()} has been kicked by ${message.author}.`);
          client.channels.find('name', 'greetings').sendMessage(`${message.mentions.users.first()} has been kicked by ${message.author}.`);
        })
      }
      } else {
        message.reply('you must be Staff to do this!');
      }
    }
  if(commandIs("info", message)) {
    message.channel.sendMessage("RocketPrices Bot (By BlueDeadpool#3487) | Version: **1.0**");
  }
  if(commandIs("prune", message)) {
		if(!message.member.roles.has("297069573058854912")) return message.reply("you must be a chat manager to use this command.");
		var user = message.mentions.users.first();
		let messagecount = parseInt(params[0]);

		message.channel.fetchMessages({limit: 100})
		.then(messages => {
			var msg_array = messages.array();
			if(user !== undefined) {
				msg_array = msg_array.filter(m => m.author.id === user.id);
				message.delete();
			}
			msg_array.length = messagecount + 1;
			if(messagecount == 100) msg_array.length = 100;

			message.channel.bulkDelete(msg_array);
			message.channel.sendMessage(`**${messagecount}** messages pruned.`);
		})
		.catch(console.log);
	}
  if(commandIs("help", message)) {
    const embed = new Discord.RichEmbed() // send embed of warning
    .setColor(0x0D00FF)
    .setTitle("RocketPrices Moderation Bot")
    .addField("!platform", "Set your platform(s) of choice!")
    .addField("!ping", "Test the response time of the bot. Ping!")
    .addField("!announce", "Announce to #news! (Admin Only)")
    .addField("!info", "Get Info about the bot!")
    .addField("!ban", "Ban a user! (Staff Only)")
    .addField("!kick", "Kick a user! (Staff Only)")
    .addField("!prune [0-100]", "Prune 1-100 prior messages to the command. (Chat Manager Only)")
    .addField("!warn @user [reason]", "Warn a user.")
    .addField("!warnings @user", "List the amount of warnings a user has.")
    .setFooter("RocketPrices Moderation Bot: By BlueDeadpool#3487")
    return message.channel.sendEmbed(embed);
  }
  if(commandIs("pong", message)) {
    message.channel.sendMessage("Ping!");
  }
  if(message.content === "!warn") {
    message.reply("mention a user and reason!");
  }
  if(commandIs("warn ", message, args)) {
    message.guild.fetchMember(message.author).then(member => {
      if(!message.member.roles.has("305387341332086794")) return message.reply("you must be staff to use this command!")
    })
      message.guild.fetchMember(message.mentions.users.first()).then(member => {
      let reason = args.slice(1).join(" "); // joins every argument after the first
      let user = message.mentions.users.first(); // grabs the first user mentioned
      let warnLog = client.channels.find("name", "warnings"); // find the channel to post to
      if (!warnLog) return message.reply("No channel named `warnings' found.").catch(console.error); // sanity check
      if (message.mentions.users.size < 1) return message.reply("you must mention someone to warn.").catch(console.error); // sanity check
      if (args.length < 2) return message.reply("You must supply a reason.").catch(console.error); // sanity check
    })


  fs.readFile("warns.json", "utf-8", function(err, data) { // read the JSON file
    if (err) throw err;

    var arrayOfObjects = JSON.parse(data); // parse the data

    for (let i = 0; i < arrayOfObjects.warnings.length; i++) { // loop through all keys in warns file
      if (arrayOfObjects.warnings[i].user_id === user.id) { // check if the user has already been warned
        message.channel.sendMessage("This user has multiple warnings! Do `!warnings @user` to find out how many!"); // display kick
        arrayOfObjects.warnings.push({ // push the data into the array
          user: `${user.username}#${user.discriminator}`,
          user_id: `${user.id}`,
          mod: `${message.author.username}#${message.author.discriminator}`,
          mod_id: `${message.author.id}`,
          reason: reason
        });

        fs.writeFile("warns.json", JSON.stringify(arrayOfObjects, null, 2), "utf-8", function(err) {
          if (err) throw err;
          const embed = new Discord.RichEmbed() // send embed of warning
          .setColor(0x0D00FF)
          .addField("Action:", "Warning")
          .addField("User:", `${user.username}#${user.discriminator}\nUserID: ${user.id}`)
          .addField("Mod:", `${message.author.username}#${message.author.discriminator}\nUserID: ${message.author.id}`)
          .addField("Reason:", reason)
          return client.channels.get(warnLog.id).sendEmbed(embed); // send embed to mod-log channel
        });
        return;
      };
    };

    arrayOfObjects.warnings.push({ // push the data into the array
      user: `${user.username}#${user.discriminator}`,
      user_id: `${user.id}`,
      mod: `${message.author.username}#${message.author.discriminator}`,
      mod_id: `${message.author.id}`,
      reason: reason
    });

    fs.writeFile("warns.json", JSON.stringify(arrayOfObjects, null, 2), "utf-8", function(err) {
    if (err) throw err;
    const embed = new Discord.RichEmbed() // send embed of warning
    .setColor(0x0D00FF)
    .addField("Action:", "Warning")
    .addField("User:", `${user.username}#${user.discriminator}\nUserID: ${user.id}`)
    .addField("Mod:", `${message.author.username}#${message.author.discriminator}\nUserID: ${message.author.id}`)
    .addField("Reason:", reason)
    message.channel.sendMessage("I have successfully warned user " + user.username + "#" + user.discriminator + ".") // send success
    return client.channels.get(warnLog.id).sendEmbed(embed); // send embed to mod-log channel
  });
});
};
  if(commandIs("warnings", message)) {
    if(message.content === "!warnings") {
      message.channel.sendMessage("Please mention a user! `Usage: !warnings @user`")
    } else {
    let user = message.mentions.users.first()
    fs.readFile("warns.json", "utf-8", function(err, data) {
      if (err) throw (err);
      var arrayOfObjects =JSON.parse(data);
      let count = 0;
      for(let i = 0; i < arrayOfObjects.warnings.length; i++) {
         if(arrayOfObjects.warnings[i].user_id === user.id) {
          count++;
        }
      }
      message.channel.sendMessage(user + " has **" + count + "** warnings.")
      count = 0;
    })
  }
 }
 if(message.content === "!platform") {
   message.channel.sendMessage("`Usage: !platform set/remove PS4/XBOX/PC`")
 }
 if(message.content === "!kick") {
   message.channel.sendMessage("`Usage: !kick @user`")
 }
 if(message.content === "!ban") {
   message.channel.sendMessage("`Usage: !ban @user`")
 }
 if(message.content === "!platform set PS4") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PS4)) return message.reply("you already have the PS4 role!");

     message.channel.sendMessage("PS4 role added.")
     message.member.addRole(PS4);
   })
 }
 if(message.content === "!platform set ps4") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PS4)) return message.reply("you already have the PS4 role!");

     message.channel.sendMessage("PS4 role added.")
     message.member.addRole(PS4);
   })
 }
 if(message.content === "!platform remove PS4") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PS4)) {
       message.member.removeRole(PS4)
       message.channel.sendMessage("PS4 role removed.")
     } else {
       message.channel.sendMessage("You do not have the PS4 role!")
     }
   })
 }
 if(message.content === "!platform remove ps4") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PS4)) {
       message.member.removeRole(PS4)
       message.channel.sendMessage("PS4 role removed.")
     } else {
       message.channel.sendMessage("You do not have the PS4 role!")
     }
   })
 }
 if(message.content === "!platform set XBOX") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(XBOX)) return message.reply("you already have the XBOX role!");

     message.channel.sendMessage("XBOX role added.")
     message.member.addRole(XBOX);
   })
 }
 if(message.content === "!platform set xbox") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(XBOX)) return message.reply("you already have the XBOX role!");

     message.channel.sendMessage("XBOX role added.")
     message.member.addRole(XBOX);
   })
 }
 if(message.content === "!platform remove XBOX") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(XBOX)) {
       message.member.removeRole(XBOX)
       message.channel.sendMessage("XBOX role removed.")
     } else {
       message.channel.sendMessage("You do not have the XBOX role!")
     }
   })
 }
 if(message.content === "!platform remove xbox") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(XBOX)) {
       message.member.removeRole(XBOX)
       message.channel.sendMessage("XBOX role removed.")
     } else {
       message.channel.sendMessage("You do not have the XBOX role!")
     }
   })
 }
 if(message.content === "!platform set PC") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PC)) return message.reply("you already have the PC role!");

     message.channel.sendMessage("PC role added.")
     message.member.addRole(PC);
   })
 }
 if(message.content === "!platform set pc") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PC)) return message.reply("you already have the PC role!");

     message.channel.sendMessage("PC role added.")
     message.member.addRole(PC);
   })
 }
 if(message.content === "!platform remove PC") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PC)) {
       message.member.removeRole(PC)
       message.channel.sendMessage("PC role removed.")
     } else {
       message.channel.sendMessage("You do not have the PC role!")
     }
   })
 }
 if(message.content === "!platform remove pc") {
   message.guild.fetchMember(message.author).then(member => {
     if(message.member.roles.has(PC)) {
       message.member.removeRole(PC)
       message.channel.sendMessage("PC role removed.")
     } else {
       message.channel.sendMessage("You do not have the PC role!")
     }
   })
 }
});
