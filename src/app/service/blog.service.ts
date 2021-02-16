import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posting } from '../model/Posting';
import { Subject } from 'rxjs'
import { delay, tap } from 'rxjs/operators';
import { EditRequest } from '../model/EditRequest';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:8080';

  postUpdated = new Subject<Posting[]>();

  private posts: Posting[] = [];

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<Posting[]>(`${this.baseUrl}/forum/get-postings`)
      .subscribe((postings) => {
        this.posts = postings;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPost(id: number) {
    return this.http.get<Posting>(`${this.baseUrl}/forum/get-posting/${id}`);
  }

  getUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    return this.http.post(`${this.baseUrl}/forum/publish`, { title: title, content: content })
    .pipe(
      tap((res)=> {
        this.posts.push(res as Posting)
        this.postUpdated.next([...this.posts]);
    }));
  }

  deletePost(id: number) {
    this.http.delete(`${this.baseUrl}/forum/delete/${id}`)
      .subscribe(() => {
        this.posts.splice(this.posts.findIndex(post => post.id === id), 1);
        this.postUpdated.next([...this.posts]);
      })
  }

  editPost(editRequest: EditRequest) {
    return this.http.put(`${this.baseUrl}/forum/edit`, editRequest).pipe(
      tap(() => {
        this.posts.find(post => post.id === editRequest.id).content = editRequest.content;
        this.posts.find(post => post.id === editRequest.id).title = editRequest.title;
        this.postUpdated.next([...this.posts]);
      }));
  }

}
