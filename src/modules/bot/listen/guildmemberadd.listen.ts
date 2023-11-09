import { AbstractListen } from './abstract.listen';
import { ChannelType, Client, TextChannel } from 'discord.js';

export class GuildMemberAddListen extends AbstractListen {
  constructor(public bot: Client) {
    super(bot);
  }

  listen(): void {
    this.bot.on('guildMemberAdd', async (member) => {

      const channel = member.guild.channels.cache.find(
        (ch) => ch.name === 'onboarding' && ch.isTextBased,
      );

      if (!channel) return;

      try {
        if(!(channel instanceof TextChannel)) return;

        const thread = await channel.threads.create({
          name: `${member.displayName}'s Onboarding`,
          autoArchiveDuration: 60,
          type: ChannelType.PrivateThread,
          reason: 'Onboarding member',
        });

        await thread.members.add(member.id);

        // Send an initial onboarding message in the thread
        thread.send(
          `Hello ${member}, welcome to Nous Psyche server! I'm bot0. \n Feel free to ask me any question regarding Nous Psyche`,
        );
      } catch (error) {
        console.error('Error creating a private thread: ', error);
      }
    });
  }
}
