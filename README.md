# ChannelCounter
チャンネル数をカウントする 

## インストール
1. リリース若しくは、からファイルをダウンロードし展開
2. ```npm install```を実行
3. [Developer Portal](https://discord.com/developers/applications)からPrivileged Intentsを有効化する<br>
![discord-div-Privileged_Intents.png](https://github.com/huda0209/resource/blob/master/discord-bot-template/discord-div-Privileged_Intents.png)<br>
赤枠内のチェックボタンをオンにする<br>
4. config内の`setting.json`にトークンをセット(MAIN_TOKENはメイン使用 DIV_TOKENはテスト用)
5. config/guildの`guildData.json`にコマンドを実行できるロールをidで追加<br>
例```["758674322310037555", "762311742432083998"]```
5. ```node main.js main```でメイントークンでbotログイン<br>

## コマンド
`/count`でチャンネル数を、カテゴリ、テキストチャンネル、ボイスチャンネル別と総計をカウントし表示する。<br>
`/count -v`とすると、チャンネルのタイプ、名前、idも表示する。
`help`でヘルプを表示する。

## 作成者
- [huda0209](https://github.com/huda0209)

## ライセンス
MITライセンス
