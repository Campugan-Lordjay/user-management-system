import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [SignUpComponent],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.signUpForm.value).toEqual({
      email: '',
      password: ''
    });
  });

  it('should validate email field', () => {
    const email = component.signUpForm.controls['email'];
    expect(email.valid).toBeFalsy();
    
    email.setValue('invalid');
    expect(email.valid).toBeFalsy();
    
    email.setValue('valid@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const password = component.signUpForm.controls['password'];
    expect(password.valid).toBeFalsy();
    
    password.setValue('short');
    expect(password.valid).toBeFalsy();
    
    password.setValue('validpassword');
    expect(password.valid).toBeTruthy();
  });
});
