import { Component, Input, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { isNumber } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  form;
  converterForm = new FormGroup({
    exelColumn: new FormControl(),
    num: new FormControl(),
    result: new FormControl()
  });

  // constructor(private formBuilder: FormBuilder) { }

  constructor(private formBuilder: FormBuilder, public renderer: Renderer2) { }
  // ngOnInit() {
  //   this.loginForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // get f() { 
  //   return this.converterForm.controls; 
  // }

  @Input() currentAlphabetValue: any = ""; 
  @Input() currentNumber: string = "";
  
  getLetersFromNumber(val){
    if (val<1){return this.currentNumber=''}
    let numeric = (val - 1) % 26;
    let letter = String.fromCharCode(65 + numeric);
    let num2 = Math.floor((val - 1) / 26);
    if (num2 > 0) {
      return this.currentNumber=this.getLetersFromNumber(num2)+letter;
    }else {
      return this.currentNumber=letter;
    }
  }

  getNumberFromLetters(input){
    
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultAlphabet= 0;
    let val = input.toUpperCase();
    let isTrue;

    for (let i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
      isTrue = false
      if (alphabet.indexOf(val[i]) != -1) {
        resultAlphabet += Math.pow(alphabet.length, j) * (alphabet.indexOf(val[i]) + 1);
        isTrue = true
      } else {
        break;
      }
    }

    if (isTrue) {
      this.currentAlphabetValue = resultAlphabet;
    }else{
      this.currentAlphabetValue = "";
    }
  }

  onNumberChange(val: number): void {

    this.getLetersFromNumber(val)
    
  }
  
  onAlphabetChange(input: string): void {

    this.getNumberFromLetters(input)
    
  }

  

  onSubmit() {}

}
