import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreationComponent },
  { path: 'edit/:postId', component: PostCreationComponent },
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
