import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailVerificationComponent } from './email-verification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { User } from '../auth.service';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmailVerificationComponent],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => 'test-token'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful verification', () => {
    const mockUser: User = { email: 'test@test.com', role: 'user', verified: true };
    spyOn(authService, 'verifyEmail').and.returnValue(of(mockUser));
    component.verifyEmail();
    expect(component.verificationStatus).toBe('success');
  });

  it('should handle verification error', () => {
    spyOn(authService, 'verifyEmail').and.throwError('error');
    component.verifyEmail();
    expect(component.verificationStatus).toBe('error');
  });
});
