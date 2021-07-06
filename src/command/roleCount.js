/*

created by huda0209
ChannelCounter for discord bot 

main.js :MAIN  'MAIN CODE'
	channelCount.js 'count of discord channles'
	roleCount.js 'count of roles'   <= this

ran by node.js

2021-7-7

*/
'use strict'

exports.roleCount = async function ([command, ...args],message,GUILD_DATA){
	let roles = message.member.roles.cache.array().map((key,index)=>{
		return key.id
	})
	let haspermission = message.member.hasPermission("ADMINISTRATOR");

	GUILD_DATA.AdminRole.map((key,index)=>{
		if(roles.indexOf(key)>-1) haspermission = true;
	})

	if(!haspermission) return message.channel.send(`権限がありません。`);

	let Roles = message.guild.roles.cache.array().map((key,index)=>{
		return [key.name,key.id];
	});
	
	console.log(`-------------------------------------------\n${message.guild.name}の情報 :`);
	console.log(Roles);
	console.log(`ロール総計: ${Roles.length}`);
	console.log(`-------------------------------------------\n`);
	if(args[0]=="-v") message.channel.send(Roles);
	message.channel.send(`ロール総計: ${Roles.length}`);
}