const Discord = require('discord.js');
  const db = require("croxydb")
  const disbut = require("discord-buttons");
 
  exports.run = async (client, button, args) => {

    if(!button.member.hasPermission("ADMINISTRATOR")) return button.channel.send("Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olman gerekiyor!")


    if (args[0] == "kapat") {
    
      if (!db.get("csticket" + button.guild.id))
      return button.reply(
        "**Bilet Sistemi Bu Sunucuda Zaten Kurulu Değil!**"
      ).catch(() => {})
    
      await db.delete(`csticket_${button.guild.id}`)
      button.channel.send("Başarıyla Verileri Temizledim!")
          }
          if (args[0] == "aç") {
      let role = button.mentions.roles.first();
      if (!role)
        return button.reply("**Bir Destek Ekibi Rolü Etiketlemen Gerek!**").catch(() => {})
     
        let akanal = button.mentions.channels.first();
      if (!akanal) return button.reply("**Bir Kanal Etiketlemen Gerek!**").catch(() => {})
          
const buton = new disbut.MessageButton()
.setStyle("gray")
.setLabel("Destek Talebi")
.setEmoji("🎫")
.setID("ticket")

const embed = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Destek Sistemi`)
.setDescription("Destek Talebi Oluşturmak İçin Aşağıdaki Butona Tıkla!")
.setColor("#8d8d8d")


akanal.send({embed: embed, button: buton})

.then(async (cs) => {
  db.set("csticket" + button.guild.id, {
    rolID: role.id
  });
    }).catch(() => {})
  
  
  
  
  }
  }

  exports.conf = {
    aliases: []
   }

  exports.help = {
    name: 'destek-sistemi'
   }