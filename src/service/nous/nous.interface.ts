export interface INousResponseResult {
  recipient_id: string;
  text: string;
}

export interface INousService {
  chat(
    sender: string,
    message: string,
  ): Promise<INousResponseResult[] | undefined>;

  compactChat(
    sender: string,
    message: string,
  ): Promise<INousResponseResult[] | undefined>;
}
