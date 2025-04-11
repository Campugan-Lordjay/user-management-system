import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  verificationStatus: 'pending' | 'success' | 'error' = 'pending';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.verifyEmail();
  }

  verifyEmail() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.verifyEmail(token)
        .subscribe({
          next: () => this.verificationStatus = 'success',
          error: () => this.verificationStatus = 'error'
        });
    } else {
      this.verificationStatus = 'error';
    }
  }
}
