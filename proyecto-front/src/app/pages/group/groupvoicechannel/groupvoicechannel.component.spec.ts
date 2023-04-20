import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupvoicechannelComponent } from './groupvoicechannel.component';

describe('GroupvoicechannelComponent', () => {
  let component: GroupvoicechannelComponent;
  let fixture: ComponentFixture<GroupvoicechannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupvoicechannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupvoicechannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
