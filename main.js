/*

created by huda0209
ChannelCounter for discord bot 

main.js :MAIN  'MAIN CODE'  <= this

ran by node.js

2021-7-1

*/
'use strict'

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//other 
const client = new discord.Client({ws: {intents: discord.Intents.ALL}});
const logger = require('./src/util/logger');
const configChecker = require('./src/util/config');

//config
const GUILD_DATA = configChecker.getConfig();
const BOT_DATA = configChecker.getBotData();


//start the bot
client.on("ready", message => {
	logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}{reset}\n`);
  	client.user.setActivity(`${BOT_DATA.PREFIX}helpでヘルプを表示 ver. ${BOT_DATA.VERSION}`, { type: 'PLAYING' });
});

//when bot join the guild, this event will load
client.on("guildCreate", guild  =>{
  	logger.info(`guildCreate catch`);
})


//message event
client.on("message", async message => {
  	if (message.content.startsWith(BOT_DATA.PREFIX)){
    	const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');   
      	if(command=="count"){
			let roles = message.member.roles.cache.array().map((key,index)=>{
				return key.id
			})
			let haspermission = message.member.hasPermission("ADMINISTRATOR");

			GUILD_DATA.AdminRole.map((key,index)=>{
				if(roles.indexOf(key)>-1) haspermission = true;
			})

			if(!haspermission) return message.channel.send(`権限がありません。`);

			let channels = message.guild.channels.cache.array().map((key,index)=>{
				return [key.type, key.name, key.id];
			});
			
			let CountOfTextChannel=0;
			let CountOfVoiceChannel=0;
			let CountOfCategory=0;

			channels.map((key,index)=>{
				if(key[0]=="text") CountOfTextChannel++;
				if(key[0]=="voice") CountOfVoiceChannel++;
				if(key[0]=="category") CountOfCategory++;
			});

			console.log(`-------------------------------------------\n${message.guild.name}の情報 :`);
			console.log(channels);
			console.log(`テキストチャンネル: ${CountOfTextChannel}\nボイスチャンネル: ${CountOfVoiceChannel}\nカテゴリ: ${CountOfCategory}\n総計: ${CountOfCategory+CountOfTextChannel+CountOfVoiceChannel}`);
			console.log(`-------------------------------------------\n`);
			if(args[0]=="-v") message.channel.send(channels);
			message.channel.send(`テキストチャンネル: ${CountOfTextChannel}\nボイスチャンネル: ${CountOfVoiceChannel}\nカテゴリ: ${CountOfCategory}\n総計: ${CountOfCategory+CountOfTextChannel+CountOfVoiceChannel}`);
		}

		if(command=="help"){
			let msg = `コマンド: \`${BOT_DATA.PREFIX}count [-v]\` -vでチャンネル詳細表示\n`;
			GUILD_DATA.AdminRole.map((key,index)=>{
				msg = msg+`<@&${key}> `;
			});
			msg = msg+`のロール保持者が実行可能`;
			message.channel.send(msg);
		}
  	};
})

let token;
if(process.argv.length == 3){
  	switch(process.argv[2]){
  	  	case "main" :
  	    	token = BOT_DATA.MAIN_TOKEN;
  	    	break;
  	  	case "div" :
  	    	configChecker.divCheck(BOT_DATA);
  	    	token = BOT_DATA.DIV_TOKEN;
  	    	BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
  	    	break;
  	  	default :
  	    	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
  	    	process.exit(0);
  	};
}else if(process.argv.length == 2){
	token = BOT_DATA.MAIN_TOKEN;
}else{
	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
	process.exit(0);
}
client.login(token);