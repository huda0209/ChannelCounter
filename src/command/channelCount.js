/*

created by huda0209
ChannelCounter for discord bot 

main.js :MAIN  'MAIN CODE'
	channelCount.js 'count of discord channles'   <= this
	roleCount.js 'count of roles'

ran by node.js

2021-7-7

*/
'use strict'
exports.channelCount = async function ([command, ...args],message,GUILD_DATA){

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