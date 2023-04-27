import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookingCreateUpdateComponent } from './order-booking-create-update.component';

describe('OrderBookingCreateUpdateComponent', () => {
  let component: OrderBookingCreateUpdateComponent;
  let fixture: ComponentFixture<OrderBookingCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBookingCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBookingCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
