import { AbstractListen } from './abstract.listen';
import { Client } from 'discord.js';
import { NousService } from '@app/service';
import { INousResponseResult } from '@app/service/nous/nous.interface';

export class MessageListen extends AbstractListen {
  constructor(public bot: Client) {
    super(bot);
  }

  listen(): void {
    this.bot.on('messageCreate', async (msg) => {
      // Listen to WH Questions
      if (/\b(what|who|where|when|why|how)\b/i.test(msg.content)) {
        let responses = await NousService.compactChat(
          msg.author.username,
          msg.content,
        );

        msg.reply(this.processText(msg.author.username, responses));
      }

      // User specifically mention bot
      if (msg.mentions.has(this.bot.user)) {
        let responses = await NousService.chat(
          msg.author.username,
          msg.content,
        );

        msg.reply(this.processText(msg.author.username, responses));
      }
    });
  }

  processText(user: string, responses: INousResponseResult[]): string {
    let texts = '';

    for (const res of responses) {
      if (res.recipient_id === user) {
        if (texts.length > 0) {
          texts += '\n\n';
        }
        texts += `${res.text}`;
      }
    }

    return texts;
  }
}
