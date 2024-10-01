import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeNewsInterfaceComponent } from './fake-news-interface.component';

describe('FakeNewsInterfaceComponent', () => {
  let component: FakeNewsInterfaceComponent;
  let fixture: ComponentFixture<FakeNewsInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeNewsInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeNewsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
