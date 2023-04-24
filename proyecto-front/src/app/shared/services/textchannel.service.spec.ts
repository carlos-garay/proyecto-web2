import { TestBed } from '@angular/core/testing';

import { TextchannelService } from './textchannel.service';

describe('TextchannelService', () => {
  let service: TextchannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextchannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
