import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle sign up', () => {
    const mockUser: User = { email: 'test@test.com', role: 'user', verified: false };
    
    service.signUp('test@test.com', 'password').subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should handle email verification', () => {
    const mockUser: User = { email: 'test@test.com', role: 'user', verified: true };
    
    service.verifyEmail('token').subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/auth/verify');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should handle login', () => {
    const mockUser: User = { 
      email: 'test@test.com', 
      role: 'user', 
      verified: true,
      token: 'jwt.token',
      refreshToken: 'refresh.token'
    };
    
    service.login('test@test.com', 'password').subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
