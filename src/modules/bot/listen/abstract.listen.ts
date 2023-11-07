import { Client } from 'discord.js';

export abstract class AbstractListen {
  constructor(public bot: Client) {}

  abstract listen(): void;
}
