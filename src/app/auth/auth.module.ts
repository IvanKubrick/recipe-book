import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ]
})
export class AuthModule {}
