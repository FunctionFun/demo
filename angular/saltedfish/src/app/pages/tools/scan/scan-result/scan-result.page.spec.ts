import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanResultPage } from './scan-result.page';

describe('ScanResultPage', () => {
  let component: ScanResultPage;
  let fixture: ComponentFixture<ScanResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
