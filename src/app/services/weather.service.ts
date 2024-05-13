import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class WeatherService {
    http = inject(HttpClient);
    baseUrl = 'https://api.openweathermap.org/data/2.5/find'
    appid = '1cb6ace31e50401f28b864f0b23fdc68'
    
    getByCity<T>(
        city: string,
        units: string
    ): Observable<T> {
        // console.log(`${this.baseUrl}find?q=${city}&units=${units}&appid=${this.appid}`);
        return this.http.get<any>(`${this.baseUrl}?q=${city}&units=${units}&appid=${this.appid}`).pipe();
    }

    getByLatLon<T>(
        lat: string,
        lon: string,
        units: string
    ): Observable<T> {
        // console.log(`${this.baseUrl}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${this.appid}`);
        return this.http.get<any>(`${this.baseUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${this.appid}`).pipe();
    }
}