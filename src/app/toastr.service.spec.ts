import { TestBed } from '@angular/core/testing';

import { ToastMessageService } from './toastr.service';

describe('ToastrService', () => {
  let service: ToastMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
