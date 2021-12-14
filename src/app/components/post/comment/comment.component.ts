import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserComponent } from '../../user/user.component';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  //Objeto enviado por componente post
  @Input() postObject: any;
  //Variables globales
  comments: any;
  inputReply: boolean =  false;

  //Declaramos el Form group para usar nuestras validaciones
  formComment: FormGroup = this.fb.group({
    comment: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(1)]]
  })

  constructor(
    private fb: FormBuilder,
    public service: ApiService,
    private userComp: UserComponent
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

   // Obtener los comentarios de cada post
  getComments(){
    this.service.getComments(this.postObject.id).subscribe(
      res => {
        this.comments = res;
      },
      error => console.log(error)
    )
  }

  //Guardar un comentario
  createComment(data: any){
  //Identificar los campos obligatorios
  this.formComment.markAllAsTouched();
    //Validamos que el formulario sea correcto
    if (this.formComment.valid) {
      let id = localStorage.getItem('id');
      if(id != null){
        data.user = {id:id};
        data.post = this.postObject;
          this.service.createComment(data).subscribe(()=>{
            this.getComments();
            this.formComment.reset();
          })
        }else{
          //Mostramos dialog para que se registre primero el usuario
          this.userComp.createUser();
          alert('Registrate poder comentar.')
        }
      }
    }

  //Optener los controles del formulario de comentarios
  get commentFormControl() {
    return this.formComment.controls;
  }

}
