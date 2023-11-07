import { AbstractCommand } from './abstract.command';
import { Client } from 'discord.js';

export class StartCommand extends AbstractCommand {
  constructor(public bot: Client) {
    super(bot);
  }

  handler(): void {
    this.bot.on('messageCreate', (msg) => {
      if (msg.content === 'Hello') {
        msg.reply(`Hello ${msg.author.username}`);
      }
    });
  }
}
