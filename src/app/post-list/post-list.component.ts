import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from '../service/blog.service';
import { Posting } from './Posting';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Posting[] = [];

  subscription: Subscription;

  constructor(private blogService: BlogService) { }


  ngOnInit(): void {
    this.blogService.getPosts();
    this.subscription = this.blogService.getUpdateListener()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deletePost(id: number){
    this.blogService.deletePost(id);
  }

}
