import { Chat } from "./chat";

export interface User {
    id: number;
    username: string;
    email: string;
    chats: Chat[];
   }