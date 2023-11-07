import axios from 'axios';
import { INousResponseResult, INousService } from './nous.interface';

export class NousServiceFactory implements INousService {
  constructor() {}

  chat(sender: string, message: string) {
    let prompt = `In the context of Nous Psyche only, and send refuse message for non-related prompt; ${message}`;
    return this.sendRequest(sender, prompt);
  }

  compactChat(sender: string, message: string) {
    let prompt = `In the context of Nous Psyche only and send refuse message for non-related prompt, send back a compact message from this message; ${message}`;
    return this.sendRequest(sender, prompt);
  }

  async sendRequest(sender: string, message: string) {
    try {
      const { data } = await axios.post<INousResponseResult[]>(
        `https://${`nouspsyche-mesolitica-com-354-rasa`}.nous.mesolitica.com/webhooks/rest/webhook`,
        { sender, message },
      );

      return data as INousResponseResult[];
    } catch (e) {
      console.log(e);
    }
  }
}

export const NousService = new NousServiceFactory();
