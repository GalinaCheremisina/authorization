import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/common/service/users.service';
import { User } from 'src/app/common/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  activeUser:User;
  fullFormControl:FormGroup;
  focusEmailInput:boolean;
  focusPasswordInput:boolean;

  constructor(private _userService:UsersService) { }

  ngOnInit() {
    this.activeUser = this._userService.userChecked;
    this.fullFormControl = new FormGroup({
      nameControl : new FormControl(this.activeUser.name,[]),
      surnameControl : new FormControl(this.activeUser.surname,[]),
      ageControl : new FormControl(this.activeUser.age,[]),
      emailControl : new FormControl(this.activeUser.email,[Validators.required,emailValidator]),
      passwordControl : new FormControl(this.activeUser.password,[Validators.minLength(3),Validators.required]),
    });
    this.fullFormControl.valueChanges.subscribe(
      (value)=>{ 
        if(value.emailControl!==this.activeUser.email) this.focusEmailInput = true;
        if(value.passwordControl!==this.activeUser.password) this.focusPasswordInput = true;      
      }
    );
  }
  onChangeItem(user:User){
    let userChanged:User = new User(
      this.fullFormControl.value.nameControl,
      this.fullFormControl.value.surnameControl,
      this.fullFormControl.value.ageControl,
      this.fullFormControl.value.emailControl, 
      this.fullFormControl.value.passwordControl);
    this._userService.userChange(userChanged);
  }
}

function emailValidator(formControl:FormControl){
  let pattern:RegExp = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
  if(!pattern.test(formControl.value)) 
    return {emailValidator:{message:'E-mail incorrect'}};
    return null;
}