import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
