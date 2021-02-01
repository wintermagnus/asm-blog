import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posting } from '../post-list/Posting';
import { Subject } from 'rxjs'
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:8080';

  postUpdated = new Subject<Posting[]>();

  private posts: Posting[] = [
    { id: 1, title: "Post1", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { id: 2, title: "Post2", content: "Nisi recusandae quia error suscipit itaque tenetur molestiae quas eum nam exercitationem. Sed ratione eius quisquam praesentium nam maiores animi voluptate id." }
  ];

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<Posting[]>(`${this.baseUrl}/forum/get-postings`)
    .pipe(delay(500))
      .subscribe((postings) => {
        this.posts = postings;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPost(id: number) {
    return this.http.get<Posting>(`${this.baseUrl}/forum/get-posting/${id}`)
      .pipe(delay(500));
  }

  getUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    this.http.post(`${this.baseUrl}/forum/publish`, { title: title, content: content })
      .pipe(delay(500))
      .subscribe((res) => {
        this.posts.push(res as Posting)
        this.postUpdated.next([...this.posts]);
      })
  }

  deletePost(id: number) {
    this.http.delete(`${this.baseUrl}/forum/delete/${id}`)
      .subscribe(() => {
        this.posts.splice(this.posts.findIndex(post => post.id === id), 1);
        this.postUpdated.next([...this.posts]);
      })
  }

  editPost(editedPost: Posting) {
    return this.http.put(`${this.baseUrl}/forum/edit`, editedPost).pipe(
      delay(500),
      tap(() => {
      this.posts.splice(this.posts.findIndex(post => post.id === editedPost.id), 1, editedPost);
      this.postUpdated.next([...this.posts]);
    }));
  }

}
