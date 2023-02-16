import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}

@Component({
  selector: 'weather-finder',
  templateUrl: './weatherFinder.component.html',
  styleUrls: ['./weatherFinder.component.scss']
})
export class WeatherFinder implements OnInit {
  searchQuery: string;
  city: CityWeather | null | undefined = null;
  init: boolean;
  get cold(): boolean {
    return Number(this.city.weather.split(' ')[0]) < 20;
  }
  constructor(
    private httpClient: HttpClient
  ) {

  }
  ngOnInit(): void {
    this.init = false;
  }
  async findWeather() {
    if (!this.searchQuery) return;
    this.httpClient.get<ApiResponse>(`https://jsonmock.hackerrank.com/api/weather?name=${this.searchQuery}`)
      .subscribe((response: ApiResponse) => {
        this.init = true;
        this.city = response.data[0];
        console.log(this.city)
      })
  }
}
