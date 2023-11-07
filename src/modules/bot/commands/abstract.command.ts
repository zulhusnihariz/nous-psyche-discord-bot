import { Client } from 'discord.js';

export abstract class AbstractCommand {
  constructor(public bot: Client) {}

  abstract handler(): void;
}
