import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  form;
  converterForm = new FormGroup({
    exelColumn: new FormControl('', [Validators.pattern(/^[A-z]{1,20}$/)]),
    num: new FormControl('', [Validators.min(1), Validators.maxLength(20)]),
    resultOfNumber: new FormControl(),
    resultOfLetter: new FormControl()
  });

  constructor(private formBuilder: FormBuilder) { }

  @Input() currentAlphabetValue: string = ""; 
  @Input() currentNumberValue: any = "";
  
  getLetersFromNumber(val){
    if (val<1){return this.currentAlphabetValue=''}
    let numeric = (val - 1) % 26;
    let letter = String.fromCharCode(65 + numeric);
    let num2 = Math.floor((val - 1) / 26);
    if (num2 > 0) {
      return this.currentAlphabetValue=this.getLetersFromNumber(num2)+letter;
    }else {
      return this.currentAlphabetValue=letter;
    }
  }

  getNumberFromLetters(input){
    if (input==""){return this.currentNumberValue=''}
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
      this.currentNumberValue = resultAlphabet;
    }else{
      this.currentNumberValue = "";
    }
  }

  onNumberChange(val: number): void {    

    this.getLetersFromNumber(val)
    
  }
  
  onAlphabetChange(input: string): void {

    this.getNumberFromLetters(input)
    
  }

  clearLeterToNumber(){
    this.converterForm.get('exelColumn').reset();
    this.converterForm.get('resultOfNumber').setValue('');
  }

  clearNumberToLeter(){
    this.converterForm.get('num').reset();
    this.converterForm.get('resultOfLetter').setValue('');
  }

  get f() { 
    return this.converterForm.controls; 
  }
}
