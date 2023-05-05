import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreateUpdateComponent } from './blog-create-update.component';

describe('BlogCreateUpdateComponent', () => {
  let component: BlogCreateUpdateComponent;
  let fixture: ComponentFixture<BlogCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
