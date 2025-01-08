import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  weather: any;
  currentTime: string = '';
  forecast: any;

  constructor(private weatherService: WeatherService) {}
  private modalService = inject(NgbModal);
  ngOnInit(): void {
    this.getWeather();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  getWeather(): void {
    this.weatherService.getWeather().subscribe(
      (data) => {
        console.log(data);
        this.weather = data;
      },
      (error) => console.error(error)
    );
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
  openForecast(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content, {
      centered: true,
      size: 'xl',
    });
    this.weatherService.getWeatherForecast().subscribe((content) => {
      console.log(content);
      this.forecast = content;
    });
  }
}
