import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent {
  searchWord: string = '';
  dictionaryData: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSearch() {
    if (this.searchWord.trim()) {
      this.displayDictionary(this.searchWord);
    }
  }

  displayDictionary(word: string) {
    this.http
      .get<any>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .subscribe(
        (data) => {
          this.dictionaryData = data[0];
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Word not found or an error occurred.';
          this.dictionaryData = null;
        }
      );
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.searchWord === '') {
      this.clearInput();
    }
  }

  onInputClick() {
    if (this.searchWord === '') {
      this.clearInput();
    }
  }

  clearInput() {
    this.searchWord = '';
    this.dictionaryData = null;
  }
}
