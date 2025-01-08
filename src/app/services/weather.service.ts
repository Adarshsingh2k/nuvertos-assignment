import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = environment.apiKey;
  private lat = '28.57';
  private lon = '77.32';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    const url = `${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getWeatherForecast(): Observable<any[]> {
    const url = `${this.forecastUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map((data) => {
        // Group data by date and same time
        const dailyForecast = this.transformData(data.list);
        return dailyForecast.slice(0, 4); // Return forecast for 4 days
      })
    );
  }

  transformData(data: any[]): any[] {
    const groupedData: any = {};

    data?.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; // Extract date
      const time = item.dt_txt.split(' ')[1]; // Extract time

      // Filter for 10:00 AM (adjust time as needed)
      if (time === '09:00:00') {
        if (!groupedData[date]) {
          groupedData[date] = {
            date: item.dt_txt,
            weather: item.weather[0].main,
            temperature: item.main.temp,
            humidity: item.main.humidity,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
          };
        }
      }
    });

    // Convert grouped data to array
    return Object.values(groupedData);
  }
}
