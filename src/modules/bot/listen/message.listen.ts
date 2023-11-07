import { AbstractListen } from './abstract.listen';
import { Client } from 'discord.js';
import { NousService } from '@app/service';

export class MessageListen extends AbstractListen {
  constructor(public bot: Client) {
    super(bot);
  }

  listen(): void {
    this.bot.on('messageCreate', async (msg) => {
      if (msg.mentions.has(this.bot.user)) {
        let responses = await NousService.compactChat(
          msg.author.username,
          msg.content,
        );

        let texts = '';

        for (const res of responses) {
          if (res.recipient_id === msg.author.username) {
            if (texts.length > 0) {
              texts += '\n\n';
            }
            texts += `${res.text}`;
          }
        }

        msg.reply(texts);
      }
    });
  }
}
