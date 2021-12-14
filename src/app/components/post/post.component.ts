import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post } from 'src/app/models/post';
import { UserComponent } from '../user/user.component';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //Variables globales
  usernameSession: any;
  showForm: boolean = false;
  alert: string = "";
  posts: any = [];

  //Declaramos el Form group para usar nuestras validaciones
  formPost: FormGroup = this.fb.group({
    title: ['', [Validators.required] ],
    content: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    public service: ApiService,
    private userComp: UserComponent) { }

  ngOnInit(): void {
    this.usernameSession = localStorage.getItem('username');
    this.getPosts();
    //this.userComp.createUser();
  }

  //Obtener listado de posts
  getPosts(){
    this.service.getPosts().subscribe(
      res => this.posts = res
    )
  }

  //Funcion para guardar un post
  createPost(data: Post){
  //Identificar los campos obligatorios
  this.formPost.markAllAsTouched();
    //Validamos que el formulario sea correcto
    if (this.formPost.valid) {
      let id = localStorage.getItem('id');
      let rol = localStorage.getItem('rol');
      if(id != null && rol == 'INTERNO'){
        data.user = {id:parseInt(id)};
        console.log(data);
          this.service.createPost(data).subscribe(
          (reg) => {
                this.getPosts();
                this.formPost.reset()
                this.showForm = false;
                this.alert = "Se creo la nota correctamente!"
              console.log(reg);
          },error =>{
            this.alert = "Algo sucedió y no se registró la nota!";
            console.log(error);
          }
        )
      }else{
        //Mostramos dialog para que se registre primero el usuario
        this.userComp.createUser();
        alert('Registrate como un usuario interno para poder registrar un post.')
      }
    }
  }

  //Optener los controls del formulario
  get postFormControl() {
    return this.formPost.controls;
  }

  // Función para mostrar u ocultar el formulario de post
  showFormPost(){
    this.showForm = !this.showForm;
  }

}
