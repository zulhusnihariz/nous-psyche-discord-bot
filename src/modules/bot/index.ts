import { botConfig } from '../../config';
import { AbstractCommand } from './commands/abstract.command';
import { StartCommand } from './commands/start.command';
import { Client } from 'discord.js';

export class DiscordBot {
  bot: Client;
  commands: AbstractCommand[] = [];

  constructor() {
    this.bot = new Client({ intents: [] });
  }

  init() {
    this.commands.push(new StartCommand(this.bot));
    this.commands.forEach((command) => {
      command.handler();
    });
    this.bot.login(botConfig.TOKEN);
  }
}
