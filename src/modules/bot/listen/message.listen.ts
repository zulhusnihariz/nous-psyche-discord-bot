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
      if (msg.author.username === this.bot.user.username) {
        return;
      }

      // Thread msg
      if (msg.channel.isThread) {
        let responses = await NousService.compactChat(
          msg.author.username,
          msg.content,
        );

        msg.channel.send(this.processText(msg.author.username, responses));
        return;
      }

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
        console.log('msg');
        let responses = await NousService.chat(
          msg.author.username,
          msg.content,
        );

        msg.reply(this.processText(msg.author.username, responses));
        return;
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
