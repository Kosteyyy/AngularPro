import { Component } from '@angular/core';
import { AuthService } from '../model/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
})
export class AdminComponent {
    constructor(private auth: AuthService, private router: Router) {}
    logout() {
        this.auth.clear();
        this.router.navigateByUrl('/');
    }
}
