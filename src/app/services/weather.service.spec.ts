import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', ()=>{
    let weatherService: WeatherService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService]
        })

        weatherService = TestBed.inject(WeatherService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should make a GET request', ()=>{
        const city = 'test-city';
        const units = 'test-units';

        weatherService.getByCity(city, units).subscribe();
        const req = httpMock.expectOne(`${weatherService.baseUrl}?q=${city}&units=${units}&appid=${weatherService.appid}`)
        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('city')).toBe(city);
        expect(req.request.params.get('units')).toBe(units);
        req.flush({});
        httpMock.verify();
    })
})