import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  today = new Date();
  constructor() { }
  now():Date {
    return new Date();
  }
  days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months = ["January", "Fenruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  tocalendar(datestring: string) {
    let input = new Date(datestring);
    let day = this.days[input.getDay()];
    let date = input.getDate();
    let month = this.months[input.getMonth()];
    return `${day}, ${date}${date == 1?'st':(date == 2?'nd':(date == 3?'rd':'th'))} of ${month} ${input.getFullYear()}`;
  }
}
