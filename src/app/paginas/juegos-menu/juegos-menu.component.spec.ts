import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosMenuComponent } from './juegos-menu.component';

describe('JuegosMenuComponent', () => {
  let component: JuegosMenuComponent;
  let fixture: ComponentFixture<JuegosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegosMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
