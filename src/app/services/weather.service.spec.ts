import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { testCityData, testLatLonData } from "src/mocks/mockData";

describe('WeatherService', ()=>{
    let weatherService: WeatherService;
    let httpTestingController: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService]
        })

        weatherService = TestBed.inject(WeatherService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should make a GET request with city param', ()=>{
        const city = 'helsinki';
        const units = 'metric';

        weatherService.getByCity(city, units)
            .subscribe(data => 
                expect(data).toEqual(testCityData)
            );
        const req = httpTestingController.expectOne(`${weatherService.baseUrl}?q=${city}&units=${units}&appid=${weatherService.appid}`)
        expect(req.request.method).toEqual('GET');
        req.flush(testCityData);
        httpTestingController.verify();
    })

    it('should make a GET request with Lat and Lon param', ()=>{
        const lat = '60.1695';
        const lon = '24.9355';
        const units = 'metric';

        weatherService.getByLatLon(lat, lon, units)
            .subscribe(data => 
                expect(data).toEqual(testLatLonData)
            );
        const req = httpTestingController.expectOne(`${weatherService.baseUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${weatherService.appid}`)
        expect(req.request.method).toEqual('GET');
        req.flush(testLatLonData);
        httpTestingController.verify();
    })
})