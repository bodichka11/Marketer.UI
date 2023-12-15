import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Interchange } from "../Models/interchange";
import { AnswerRequest } from "../Models/answerRequest";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AnswerService {
    private apiUrl = 'https://localhost:5001/api/Answer';
  
    constructor(private http: HttpClient) { }
  
    getAnswer(requestDto: AnswerRequest): Observable<Interchange> {
      return this.http.post<Interchange>(this.apiUrl, requestDto);
    }
  }