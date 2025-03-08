import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-box',
  template: `
    <div class="chat-container">
      <div class="input-section">
        <label for="userInput" class="input-label">Enter your message</label>
        <input [(ngModel)]="userInput" id="userInput" placeholder="Type here..." class="chat-input" />
        <button (click)="sendMessage()" class="send-button">Send</button>
      </div>
      
      <div class="response-section">
        <label for="responseArea" class="response-label">Response</label>
        <textarea [value]="response" id="responseArea" class="response-area" readonly></textarea>
      </div>
    </div>
  `,
  styles: [
    `
    /* Importing Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Poppins:wght@400;600&display=swap');

    /* General Layout */
    .chat-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      max-width: 450px;
      margin: auto;
      background-color: #000000; /* Black background */
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .chat-container:hover {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    /* Input Section Styles */
    .input-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .input-label {
      font-size: 14px;
      font-family: 'Poppins', sans-serif;
      color: #ffffff; /* White text for the label */
      font-weight: bold;
      margin-bottom: 5px;
    }

    .chat-input {
      padding: 14px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 10px;
      outline: none;
      color: #ffffff; /* White text for input */
      background-color: #333333; /* Dark background for input field */
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .chat-input:focus {
      border-color: #007bff;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    }

    .send-button {
      padding: 12px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .send-button:hover {
      background-color: #0056b3;
    }

    .send-button:active {
      background-color: #003d7a;
    }

    /* Response Section Styles */
    .response-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .response-label {
      font-size: 14px;
      font-family: 'Roboto', sans-serif;
      color: #ffffff; /* White text for the label */
      font-weight: bold;
      margin-bottom: 5px;
    }

    .response-area {
      width: 100%;
      padding: 14px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      border: 2px solid #ddd;
      border-radius: 10px;
      min-height: 150px;
      max-height: 250px;
      resize: vertical;
      background-color: #333333; /* Dark background for response area */
      color: #ffffff; /* White text for response area */
      line-height: 1.5;
      box-sizing: border-box;
      overflow-y: auto;
      transition: all 0.3s ease;
    }

    .response-area:focus {
      border-color: #007bff;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .chat-container {
        width: 90%;
        padding: 20px;
      }

      .send-button {
        padding: 10px;
        font-size: 14px;
      }

      .chat-input,
      .response-area {
        font-size: 14px;
      }

      .response-area {
        min-height: 100px;
      }
    }

    /* Hover and Focus Animations */
    .chat-input, .response-area {
      transition: all 0.3s ease;
    }

    .chat-container:hover .chat-input, .chat-container:hover .response-area {
      transform: scale(1.02);
    }
    `
  ]
})
export class ChatBoxComponent {
  userInput: string = '';
  response: Object = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.http.get<{ response: string }>('http://localhost:8080/get-solution/' + this.userInput)
        .subscribe((res: any) => {
          this.response = res.text;
        }, err => {
          this.response = err;
        });
    }
  }
}
