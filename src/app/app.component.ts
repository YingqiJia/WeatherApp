import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  city: any;
  units: boolean;

  weatherType = ['Default', 'Clear', 'Clouds', 'Rain', 'Snow'];
  weatherList: any = [];
  selectedCity: any;

  showCityList = false;
  showWeatherInfo = false;

  constructor(
    private weather: WeatherService
  ) {
    this.city = localStorage.getItem('city');
    let storedUnits = localStorage.getItem('units') || JSON.stringify('metric');
    this.units = JSON.parse(storedUnits) !== 'imperial' ? true : false;
  }

  ngOnInit(): void {
    let cityInit: any;
    if (this.city) {
      cityInit = JSON.parse(this.city);
      this.updateValue(cityInit.name, cityInit.coord);
    }
  }

  searchResults(cityName: string) {
    if (!cityName) {
      return;
    }
    this.showWeatherInfo = false;
    let weatherData$ = this.weather.getByCity<any>(cityName, this.units ? 'metric' : 'imperial');
    weatherData$.subscribe(res => {
      if (res.count) {
        this.weatherList = res.list;
        if (res.count === 1) {
          this.setValue(this.weatherList[0]);
        }
        else {
          this.showCityList = true;
        }
      }
      else {
        alert("City not found, please check your input!");
      }
    })
  }

  filterResults(item: any) {
    this.setValue(item);
  }

  setValue(item: any) {
    this.selectedCity = item;
    localStorage.setItem('city', JSON.stringify({ name: this.selectedCity.name, coord: this.selectedCity.coord }));

    let type = this.weatherType.indexOf(this.selectedCity.weather[0].main);
    if (type < 0)
      type = 0;
    this.selectedCity.imagsrc = '../../../assets/' + this.weatherType[type] + '.svg';
    this.selectedCity.description = this.selectedCity.weather[0].description.charAt(0).toUpperCase() + this.selectedCity.weather[0].description.slice(1);

    this.showCityList = false;
    this.showWeatherInfo = true;
    // console.log(this.selectedCity);
  }

  updateValue(name: string, coord: any) {
    let weatherData$ = this.weather.getByCity<any>(name, this.units ? 'metric' : 'imperial');
      weatherData$.subscribe(res => {
        let filterRes = res.list.filter((item: any)=>{
          return item.coord.lat === coord.lat && item.coord.lon === coord.lon;
        })
        this.setValue(filterRes[0]);
      })
  }

  unitsChanged(){
    localStorage.setItem('units', JSON.stringify(this.units?'metric':'imperial'));
    this.updateValue(this.selectedCity.name, this.selectedCity.coord);
  }

  get showWeather(): boolean {
    return this.showWeatherInfo;
  }
}
