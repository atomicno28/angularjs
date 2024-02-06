import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'forms';
  reactiveForm: FormGroup;
  formStatus;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [
          Validators.required,
          this.noSpaceAllowed,
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          this.noSpaceAllowed,
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.emailNotAllowed
        ),
      }),
      gender: new FormControl('male'),
      country: new FormControl('india'),
      hobbies: new FormControl(null),
      skills: new FormArray([new FormControl(null, Validators.required)]),
    });

    // SIMILAR to console.log(e.target.value)!
    // this.reactiveForm
    //   .get('personalDetails.firstname')
    //   .valueChanges.subscribe((value) => {
    //     console.log(value);
    //   });

    // ACCESSING ENTIRE reactiveForm...
    // this.reactiveForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    });

    // setTimeout(() => {
    //   this.reactiveForm.setValue({
    //     personalDetails: { firstname: '', lastname: '', email: 'abc@gmail.com' },
    //     gender: '',
    //     country: '',
    //     hobbies: '',
    //     skills: [],
    //   });
    // }, 4000);

    setTimeout(() => {
      this.reactiveForm.patchValue({
        personalDetails: { email: 'nikhilid2205@gmail.com' },
      });
    }, 4000);
  }
  onSubmit() {
    console.log(this.reactiveForm);
    this.reactiveForm.reset({
      personalDetails: { firstname: '', lastname: '', email: 'abc@gmail.com' },
      gender: 'male',
      country: 'india',
      hobbies: '',
      skills: [],
    });
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  // ASYNC VALIDATOR...
  emailNotAllowed(control: FormControl): Promise<any> | Observable<any> {
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'nikzedit@gmail.com') {
          resolve({ emailNotAllowed: true });
        } else {
          resolve(null);
        }
      }, 5000);
    });
    return response;
  }
}
