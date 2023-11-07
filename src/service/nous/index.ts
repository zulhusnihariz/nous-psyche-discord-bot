import axios from 'axios';
import { INousResponseResult, INousService } from './nous.interface';

export class NousServiceFactory implements INousService {
  constructor() {}

  chat(sender: string, message: string) {
    return this.sendRequest(sender, message);
  }

  compactChat(sender: string, message: string) {
    let prompt = `Send back a compact message from this message; ${message}`;
    return this.sendRequest(sender, prompt);
  }

  async sendRequest(sender: string, message: string) {
    try {
      const { data } = await axios.post<INousResponseResult[]>(
        `https://${`khalil-himura-gmail-com-280-rasa`}.nous.mesolitica.com/webhooks/rest/webhook`,
        { sender, message },
      );

      return data as INousResponseResult[];
    } catch (e) {
      console.log(e);
    }
  }
}

export const NousService = new NousServiceFactory();
