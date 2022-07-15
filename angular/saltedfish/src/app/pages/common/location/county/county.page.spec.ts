import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountyPage } from './county.page';

describe('CountyPage', () => {
  let component: CountyPage;
  let fixture: ComponentFixture<CountyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
