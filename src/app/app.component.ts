import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public loadedFeature = 'recipes';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: "AIzaSyDdQ7UAm_wbAEhut_IN3qaKOFx15yl8I8I",
            authDomain: "ng-recipe-book-c1273.firebaseapp.com"
        })
    }

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
