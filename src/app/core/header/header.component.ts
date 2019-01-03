import { Component } from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {
    constructor(
        private dataStorageService: DataStorageService,
        public authService: AuthService
    ) {}
    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(response => {
            console.log('recipes saved', response);
        });
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.signout();
    }
}
