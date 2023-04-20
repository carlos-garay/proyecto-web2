import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouptextchannelComponent } from './grouptextchannel.component';

describe('GrouptextchannelComponent', () => {
  let component: GrouptextchannelComponent;
  let fixture: ComponentFixture<GrouptextchannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrouptextchannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrouptextchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
