import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserComponent } from '../../user/user.component';
@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  //Objeto enviado por componente post
  @Input() commentObject: any;

  //Variables globales
  replies: any;
  inputReply: boolean =  false;

  //Declaramos el Form group para usar nuestras validaciones
  formReply: FormGroup = this.fb.group({
    answer: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(1)]]
  })

  constructor(
    private fb: FormBuilder,
    public service: ApiService,
    private userComp: UserComponent
  ) { }

  ngOnInit(): void {
    this.getReplies();
  }

  // Funciones de respuestas
  getReplies(){
    this.service.getReplies(this.commentObject.id).subscribe(
      res => this.replies = res,
      error => console.log(error)
    )
  }
  createReply(reply: any){
    //Identificar los campos obligatorios
    this.formReply.markAllAsTouched();
      //Validamos que el formulario sea correcto
      if (this.formReply.valid) {
        let id = localStorage.getItem('id');
        if(id != null){
          reply.user = {id:id};
          reply.comment = this.commentObject;
          console.log(reply);
          this.service.createReply(reply).subscribe(()=>{
            this.getReplies();
            this.formReply.reset();
            this.inputReply = false;
          })
        }else{
          //Mostramos dialog para que se registre primero el usuario
          this.userComp.createUser();
          alert('Registrate poder responder un comentario.')
        }
      }
  }

  //Optener los controles del formulario
  get replyFormControl() {
    return this.formReply.controls;
  }

  // Mostrar input para respuesta
  showReplayInput(){
    this.inputReply = !this.inputReply;
  }

  hiddenReplayInput(){
    this.inputReply = false
  }

}
