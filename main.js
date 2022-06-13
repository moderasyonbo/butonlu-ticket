const Discord = require("discord.js")     
const client = new Discord.Client();      
const ayarlar = require("./config.js")   
const fs = require("fs");                
const disbut = require("discord-buttons")
require("discord-buttons")(client)
client.on('ready', () => {

    console.log("Giris Yaptim!");
      });
     

client.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./commands/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});




    	








{
   

    const cdb = require("croxydb")
    client.on("clickButton", async button => {
  
    //------------\\
    const evet = new disbut.MessageButton()
    .setStyle("green")
    .setLabel("Evet")
    .setID("Evet");
    const geriyükle = new disbut.MessageButton()
    .setStyle("green")
    .setLabel("Geri Yükle")
    .setID("GeriYükle");
    const sil = new disbut.MessageButton()
    .setStyle("red")
    .setLabel("Desteği Sil")
    .setID("DesteğiKapat");
    const kilit = new disbut.MessageButton()
    .setStyle("grey")
    .setLabel("Kapat")
    .setEmoji("🔒")
    .setID("Kilit");
    //------------\\
    
    //------------\\
    let member = button.guild.members.cache.get(button.clicker.user.id)
    let kanal  = button.guild.channels.cache.get(button.channel.id)
    let data   = await cdb.get(`destekkullanıcı_${member.id}`);
    let data3 = await cdb.get("csticket"+ button.guild.id)
    let csrole = button.guild.roles.cache.get(data3.rolID)
    let data2  = await cdb.get(`destekkanal_${kanal.id}`);
    let user   = button.guild.members.cache.get(data2);
    
    //------------\\
    
    //------------\\
    if(button.id === "ticket"){

    
    button.reply.think(true).then(async a => {
      if(!button.guild.channels.cache.find(c => c.name === "Destek Sistemi")){
    button.guild.channels.create('Destek Sistemi' , {type: 'category'})
      }
      setTimeout(() => {
        const csk = button.guild.channels.cache.find(c => c.name === "Destek Sistemi")
    button.guild.channels.create('destek-' + member.user.username , { type: 'text', reason: 'Destek '+ member.user.tag }).then(async c => {
    c.setParent(csk.id);
    
    await cdb.set(`destekkanal_${c.id}`, member.id);
    await cdb.set(`destekkullanıcı_${member.id}`, c.id);

              let role = button.guild.roles.cache.find(a => a.name === '@everyone')      
              await c.createOverwrite(role.id, {
                  SEND_MESSAGES: false,
                  VIEW_CHANNEL: false
                });
      
                await c.createOverwrite(role.id, {
                  SEND_MESSAGES: false,
                  VIEW_CHANNEL: false
                });
      
           
                await c.createOverwrite(csrole, {  
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true,
                  READ_MESSAGE_HISTORY: true
                })
    

              await c.createOverwrite(member.id, {  
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true
                })
    
    a.edit("> **Başarılı!** Destek talebiniz oluşturuldu. **Kanal:** <#" + c.id +">")
    
    const embed =  new Discord.MessageEmbed()
    .setTitle("Destek Talebi Oluşturuldu!")
    .setDescription(`${member.user}, Hoş Geldin destek ekibi sizinle ilgilenecektir.`)
    .setColor("GOLD")
    
    await c.send({embed: embed, buttons: [kilit]})

        
    })
      }, 2000)
    })
    } else {
    
    
    
    //------------\\
    
   const embed3 = new Discord.MessageEmbed()
   .setTitle("Uyarı!")
   .setDescription("**Dikkat!** Destek talebini kapatmak istediğine emin misin?")
   .setColor("GOLD")
   if(button.id === "Kilit"){
    
    
      button.message.edit(  {
    buttons: [evet],
    embed: embed3
    })
    
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "Evet"){
    
     await kanal.createOverwrite(user, {  
                  SEND_MESSAGES: false,
                  VIEW_CHANNEL: false
                })
    
const embed4 = new Discord.MessageEmbed()
.setTitle("Destek Talebi Kapatıldı!")
.setDescription("<@" + member + `> Tarafından destek talebi kapatıldı.`)
.setColor("RED")



const buttonlar = new Discord.MessageEmbed()
.setTitle("Bilgi")
.setDescription("Merhaba **Yetkili** Aşağıdaki Butonlardan Destek Talebini Geri Açabilirsin!")
.setColor("RANDOM")
    await button.message.delete()
    await button.channel.send( {
    buttons: [geriyükle],
    embed: buttonlar
    })
    
    await kanal.setName("kapalı-"+ user.user.username)
    
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "GeriYükle"){
      await await kanal.setName("destek-"+ user.user.username)
              await kanal.createOverwrite(user, {  
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true
                })
    
                const dikkat = new Discord.MessageEmbed()
                .setTitle("Dikkat!")
                .setDescription("<@" + user + `> Destek talebi tekrar açıldı.`)
                .setColor("GREEN")
    await button.channel.send({
    buttons: [kilit],
    embed: dikkat
    })
    
    await button.message.delete()
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    if(button.id === "DesteğiKapat"){
    await cdb.delete(`destekkanal_${kanal.id}`);
    await cdb.delete(`destekkullanıcı_${user.id}`);
    
    button.channel.delete()
    button.reply.defer()
    } else {
    //------------\\
    
    //------------\\
    const geri = new Discord.MessageEmbed()
    .setTitle("Destek Talebi Oluşturuldu!")
    .setDescription(`${member.user}, Hoş Geldin destek ekibi sizinle ilgilenecektir.`)
    .setColor("GOLD")
    
    if(button.id === "Evet"){
   
    button.reply.defer()
    } else {
    }}}}}
    }
    //------------\\
    
    }); 
    
    client.on("guildMemberRemove", async member => {
    
    //------------\\
    let data   = await cdb.get(`destekkullanıcı_${member.id}`);
    let data2  = await cdb.get(`destekkanal_${data}`);
    let kanal  = member.guild.channels.cache.get(data)
    //------------\\
    
    if(!data) return;
    
    //------------\\
    await cdb.delete(`destekkanal_${data.id}`);
    await cdb.delete(`destekkullanıcı_${member.id}`);
    
    kanal.delete()
    //------------\\
    
    })
    client.on("channelDelete", async channel => {
    
    //------------\\
    let data  = await cdb.get(`destekkanal_${channel.id}`);
    let data2   = await cdb.get(`destekkullanıcı_${data}`);
    //------------\\
    
    if(!data) return;
    
    //------------\\
    await cdb.delete(`destekkanal_${channel.id}`);
    await cdb.delete(`destekkullanıcı_${data}`);
    
    //------------\\
    
    })
    }

  
client.login(ayarlar.token)
