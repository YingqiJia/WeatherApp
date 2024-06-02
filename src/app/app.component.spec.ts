import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, FormsModule
      ],
      declarations: [
        AppComponent, WeatherComponent
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-weather component if city found', () => {  
    component.showWeatherInfo = true;
    component.selectedCity = {"imagsrc": '../../../assets/Clear.svg', 
                              "name": 'Helsinki', 
                              "sys": {country: 'Finland'}, 
                              "main": { "temp": 19, "temp_min": 18.56, "temp_max": 20.92}}
    component.units = true;
    fixture.detectChanges();
    const subComp = fixture.debugElement.query(By.css('app-weather')).nativeElement;   //nativeElement as HTMLElement;
    expect(subComp).toBeTruthy();
  });
});
