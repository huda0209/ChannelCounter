/*

created by huda0209
ChannelCounter for discord bot 

main.js :MAIN  'MAIN CODE'   <= this
	channelCount.js 'count of discord channles'
	roleCount.js 'count of roles'

ran by node.js

2021-7-7

*/
'use strict'

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//functions
const channelCount = require("./src/command/channelCount");
const roleCount = require("./src/command/roleCount");

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
      	if(command=="cc"||command=="countchannel"){
			channelCount.channelCount();
		}

		if(command=="cr"||command=="countrole"){
			roleCount.roleCount();
		}

		if(command=="help"){
			let msg = `コマンド: \`${BOT_DATA.PREFIX}count [-v]\` -vでチャンネル詳細表示\n`;
			GUILD_DATA.AdminRole.map((key,index)=>{
				msg = msg+`\\<@&${key}> `;
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