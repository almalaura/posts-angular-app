import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:8080/api/";
  constructor( private http:HttpClient ) { }

  //Peticiones de posts
  getPosts() {
    return this.http.get(this.url + "posts");
  }

  createPost(post: Post) {
    return this.http.post(this.url + "post", post);
  }

  //Obtener respuestas según el id del comentario
  getReplies(id: number) {
    return this.http.get(this.url + "replies/"+id);
  }

  //Crear una respuesta
  createReply(reply: Answer) {
    return this.http.post(this.url + "replies", reply);
  }

  //Obtener comentarios según el id del post
  getComments(id: number) {
    return this.http.get(this.url + "comments/"+id);
  }

  //Guardar un comentario
  createComment(comment: Comment) {
    return this.http.post(this.url + "comment", comment);
  }

  //Peticiones de usuario
  createUser(user: User) {
    return this.http.post(this.url + "user", user)
  }

  getUserByUsername(username: any){
    return this.http.get(this.url+"user/"+ username)
  }

  //Eliminar datos de la sesion
  logOut() {
    localStorage.removeItem('id')
    localStorage.removeItem('rol')
    localStorage.removeItem('username')
  }
}
