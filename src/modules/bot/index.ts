import { botConfig } from '@app/config';
import { AbstractCommand } from './commands/abstract.command';
import { Client, GatewayIntentBits } from 'discord.js';
import { AbstractListen } from './listen/abstract.listen';
import { MessageListen } from './listen/message.listen';
import { GuildMemberAddListen } from './listen/guildmemberadd.listen';

export class DiscordBot {
  bot: Client;
  commands: AbstractCommand[] = [];
  listeners: AbstractListen[] = [];

  constructor() {
    this.bot = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.bot.on('ready', () => {
      console.log(`Logged in as ${this.bot.user.tag}!`);
    });
  }

  init() {
    this.bot.login(botConfig.TOKEN);

    this.listeners.push(new MessageListen(this.bot));
    this.listeners.push(new GuildMemberAddListen(this.bot));
    this.listeners.forEach((listener) => {
      listener.listen();
    });
  }
}
