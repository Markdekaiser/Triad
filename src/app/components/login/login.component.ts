import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    
    if(sessionStorage.getItem("account_id")){
      this.router.navigate(['product']);
    }
  }

  onSubmit(event: any){
    if(this.loginForm.invalid){
      console.log("Invalid Input")
    }else{
      this.dataService.request('login', this.loginForm.value).subscribe((res: any ) =>{
        if(res.data){
          window.sessionStorage.setItem(
            'account_id', res.data.account_id
          );
          
          this.router.navigate(['cart']);
        }else if(res.error){
          alert('Error Email or Password Incorrect')
        }
      })
    }
  }


}
