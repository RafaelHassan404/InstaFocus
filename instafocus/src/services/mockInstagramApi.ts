export type Story = {
  id: string;
  username: string;
  color: string;
  seen: boolean;
};

export type Conversation = {
  id: string;
  username: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

const stories: Story[] = [
  { id: '1', username: 'alex', color: '#e17055', seen: false },
  { id: '2', username: 'sara', color: '#0984e3', seen: false },
  { id: '3', username: 'omar', color: '#00b894', seen: true },
  { id: '4', username: 'lina', color: '#6c5ce7', seen: false },
  { id: '5', username: 'zain', color: '#fdcb6e', seen: true },
  { id: '6', username: 'maya', color: '#d63031', seen: false },
];

const conversations: Conversation[] = [
  { id: 'c1', username: 'alex', lastMessage: 'Are we still on for tonight?', time: '2m', unread: true },
  { id: 'c2', username: 'sara', lastMessage: 'Sent you the notes', time: '1h', unread: false },
  { id: 'c3', username: 'omar', lastMessage: 'Haha that was great', time: '3h', unread: false },
  { id: 'c4', username: 'lina', lastMessage: 'Call me when you are free', time: '1d', unread: true },
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getStories(): Promise<Story[]> {
  await delay(300);
  return stories;
}

export async function getConversations(): Promise<Conversation[]> {
  await delay(300);
  return conversations;
}