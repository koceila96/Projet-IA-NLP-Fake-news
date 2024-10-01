import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'bootstrap';
import '@popperjs/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  news: string = '';
  prediction: string = '';
  predictionColor: string = ''; // Initialisation ajoutée ici

  constructor(private http: HttpClient) {}

  onSubmit() {

    this.http.post<any>('http://127.0.0.1:5000/predict', { news: this.news })
      .subscribe(data => {
       console.log('reponse de la porediction :', data.prediction)
        this.predictionColor = data.prediction === 'Fake News' ? 'red' : 'green';
        if(data.prediction == 'Fake News'){
           this.playAlarm()
           alert('its can be a fake news')
        }
      });
  }

  playAlarm(){
    var alarm = document.getElementById('alarmSound') as HTMLAudioElement;
    alarm.play();
  }
}
