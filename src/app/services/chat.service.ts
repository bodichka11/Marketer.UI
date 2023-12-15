import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../Models/chat';
import { Observable, catchError } from 'rxjs';
import { CreateChatDto } from '../Models/CreateChatDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  createChat(chat: CreateChatDto): Observable<Chat> {
    return this.httpClient.post<Chat>("https://localhost:5001/api/Chat", chat)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; 
        })
      );
  }

  deleteChat(id: number): Observable<any>{
    return this.httpClient.delete(`https://localhost:5001/api/Chat/${id}`);
  }
}
