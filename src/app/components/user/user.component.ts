import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/service/api.service';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isChecked: Boolean = false;
  //Declaramos el Form group para usar nuestras validaciones
  formUser: FormGroup = this.fb.group({
    //firstname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
    //lastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
    //name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
    username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
    //address: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(1)]],
    rol: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
    //hiredate: ['', [Validators.required]],
  })
  constructor(
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    public service: ApiService,
  ) { }

  ngOnInit(): void {
  }

  //Registrar usuario
  createUser(){
    const dialogRef = this.dialog.open(UserComponent,{
        width: '40%',
    })
    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      //Identificar los campos obligatorios si no titnen datos
      this.formUser.markAllAsTouched();
      //Validamos que el formulario sea correcto
        const finalUser = {
          ...result.value,
        }
        this.service.createUser(finalUser).subscribe(
          (reg: any) => {
            console.log(reg);
            localStorage.setItem('id', reg.id);
            localStorage.setItem('rol', reg.rol);
            localStorage.setItem('username', reg.username);
          }
        )
    });
  }

  //Optener los controls del formulario
  get userFormControl() {
    return this.formUser.controls;
  }

  checkValue(event:any) {
    console.log(event);
      this.isChecked = !this.isChecked;
  }
}
