import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendchatComponent } from './friendchat.component';

describe('FriendchatComponent', () => {
  let component: FriendchatComponent;
  let fixture: ComponentFixture<FriendchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendchatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
