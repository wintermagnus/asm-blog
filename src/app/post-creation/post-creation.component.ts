import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Posting } from '../post-list/Posting';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  private mode = 'create';
  private postId: number;
  public post: Posting;
  isLoading = false;

  constructor(
    public blogService: BlogService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = parseInt(paramMap.get('postId'))
        this.isLoading = true;
        this.blogService.getPost(this.postId).subscribe((postData)=>{
          this.post = postData;
          this.isLoading = false;
        });

      } else {
        this.mode = 'create';
        this.post = new Posting(null,'','');
        this.postId = null;
      }
    });
  }

  sendPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true
    if (this.mode === 'create') {
      this.blogService.addPost(form.value.title, form.value.content);
      form.resetForm();
    } else if (this.mode === 'edit') {
      this.blogService.editPost({
        id: this.postId,
        title: form.value.title,
        content: form.value.content
      }).subscribe(() => {
        this.router.navigateByUrl('/')
      });
    }

  }



}
