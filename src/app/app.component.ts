import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';

  form: FormGroup = new FormGroup({
    firstname: new FormControl('',
      Validators.required),
    lastname: new FormControl('',
      Validators.required),
    userContactInfo: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')
      ]),
      socialMedia: new FormControl('',[
        Validators.required,
      ]),
      link: new FormControl('', [
        Validators.required,
        Validators.pattern('https?://.+')
      ]),
      active: new FormControl('true',
        Validators.required
        ),
      description: new FormControl('',
        Validators.required),
    }),
    experience: new FormArray([
      new FormGroup({
        company: new FormControl('',
          Validators.required,
        ),
        years: new FormControl('',
          Validators.required,
        ),
      }),
    ])
  });

  get experienceFormArray() {
    return this.form.get('experience') as FormArray;
  }

  addExperience() {
    this.experienceFormArray.push(new FormGroup({
      company: new FormControl('',
      Validators.required),
      years: new FormControl('',[
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(1),
        Validators.max(99)
      ]),
      })
    )}


  constructor() {
  }

  ngOnInit(): void {

  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form);

  }

  removeExperience(i: number) {
    this.experienceFormArray.removeAt(i);
  }
}

