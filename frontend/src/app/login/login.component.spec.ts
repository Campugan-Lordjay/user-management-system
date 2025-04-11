import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [LoginComponent],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: ''
    });
  });

  it('should validate email field', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    
    email.setValue('invalid');
    expect(email.valid).toBeFalsy();
    
    email.setValue('valid@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    
    password.setValue('password');
    expect(password.valid).toBeTruthy();
  });
});
