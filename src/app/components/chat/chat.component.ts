import { Component, OnInit } from '@angular/core';
import { AnswerRequest } from 'src/app/Models/answerRequest';
import { Chat } from 'src/app/Models/chat';
import { Interchange } from 'src/app/Models/interchange';
import { AnswerService } from 'src/app/services/answer.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  interchanges: Interchange[] = [];
  chat?: Chat | null = null;
  selectedChat: Chat | null = null;
  questionInput: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private answerService: AnswerService
  ) {}
  ngOnInit(): void {
    this.getChats();
    this.loadStoredData();
  }

  createChat(): void {
    const user = this.authService.getUserInfo();

    if (user) {
      this.chatService.createChat({ userId: user.id }).subscribe({
        next: (value: Chat) => {
          this.chats.push(value);
          this.selectedChat = value;
          this.interchanges = value.interchanges;
          this.saveDataToStorage();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  getChats(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.chats = user.chats;
      if (this.chats.length > 0) {
        this.interchanges = this.chats[0].interchanges;
        this.interchanges = this.selectedChat
          ? this.selectedChat.interchanges
          : [];
      }
    }
  }

  onSelectChat(chat: Chat): void {
    this.selectedChat = chat;
    this.interchanges = chat ? chat.interchanges : [];
    this.saveDataToStorage();
  }

  askQuestion(): void {
    const user = this.authService.getUserInfo();

    if (user && this.selectedChat && this.questionInput.trim() !== '') {
      const requestDto: AnswerRequest = {
        chatId: this.selectedChat.id,
        question: this.questionInput.trim(),
      };

      this.answerService.getAnswer(requestDto).subscribe({
        next: (response: Interchange) => {
          this.interchanges.push(response);
          this.questionInput = '';
          this.saveDataToStorage();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
  
  deleteChat(): void {
    if (this.selectedChat) {
      const chatId = this.selectedChat.id;
  
      this.chatService.deleteChat(chatId).subscribe({
        next: () => {
          // Remove the deleted chat from the local array
          this.chats = this.chats.filter(chat => chat.id !== chatId);
  
          // Update selectedChat to null after deletion
          this.selectedChat = null;
  
          // Update interchanges to an empty array after deletion
          this.interchanges = [];
  
          // Save the updated data to storage
          this.saveDataToStorage();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  private saveDataToStorage(): void {
    
    localStorage.setItem('chats', JSON.stringify(this.chats));
    localStorage.setItem('selectedChat', JSON.stringify(this.selectedChat));
    localStorage.setItem('interchanges', JSON.stringify(this.interchanges));
  }

  private loadStoredData(): void {
    
    const storedChats = localStorage.getItem('chats');
    const storedSelectedChat = localStorage.getItem('selectedChat');
    const storedInterchanges = localStorage.getItem('interchanges');

    if (storedChats) {
      this.chats = JSON.parse(storedChats);
    }

    if (storedSelectedChat) {
      this.selectedChat = JSON.parse(storedSelectedChat);
    }

    if (storedInterchanges) {
      this.interchanges = JSON.parse(storedInterchanges);
    }
  }
}
