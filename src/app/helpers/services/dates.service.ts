import { Injectable } from '@angular/core';
import { format, add, isBefore } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  today = new Date();
  constructor() {}

  formatDate(date: Date = this.today, dateFormat: string = 'yyyy-MM-dd') {
    return format(date, dateFormat);
  }

  /*
  {
    years: 2,
    months: 9,
    weeks: 1,
    days: 7,
    hours: 5,
    minutes: 9,
    seconds: 30,
  }
  */
  add(object: {}, date: Date = this.today): Date {
    return add(date, object);
  }

  addMonths(addMonths: number, date: Date = this.today): Date {
    return add(date, { months: addMonths });
  }
}
