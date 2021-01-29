import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreationComponent },
  { path: 'edit/:postId', component: PostCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
