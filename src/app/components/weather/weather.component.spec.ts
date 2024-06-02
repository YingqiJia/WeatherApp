import { TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent ]
    })
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WeatherComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
