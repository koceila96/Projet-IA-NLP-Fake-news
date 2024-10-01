import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-fake-news-interface',
  templateUrl: './fake-news-interface.component.html',
  styleUrls: ['./fake-news-interface.component.css']
})
export class FakeNewsInterfaceComponent {
  news: string = '';
  prediction: string = '';
  predictionColor: string = ''; // Initialisation ajoutée ici

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://localhost:5000/predict', { news: this.news })
      .subscribe(data => {
        this.prediction = data.LR;
        this.predictionColor = data.LR === 'Fake News' ? 'red' : 'green';
      });
  }

}
