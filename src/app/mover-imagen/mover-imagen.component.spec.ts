import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverImagenComponent } from './mover-imagen.component';

describe('MoverImagenComponent', () => {
  let component: MoverImagenComponent;
  let fixture: ComponentFixture<MoverImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoverImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
