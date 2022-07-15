import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebviewPage } from './webview.page';

describe('WebviewPage', () => {
  let component: WebviewPage;
  let fixture: ComponentFixture<WebviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
