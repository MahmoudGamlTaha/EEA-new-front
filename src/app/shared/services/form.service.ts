import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import validator from 'validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor() {}

  buildForm(model , isCheckerForm) {
    let formgroup:FormGroup;
    const formGroupFields = this.getFormControlsFields(model , isCheckerForm);
    // Creating the form Builer
    formgroup = new FormGroup(formGroupFields.formGroupFields);
    let fields = formGroupFields.fields;
    return {formgroup , fields}
  }

  getFormControlsFields(model , isCheckerForm) {
 
    const formGroupFields = {};
    let fields = [];
    for (const field of Object.keys(model)) {
      const fieldProps = model[field];
      const validators = this.addValidator(fieldProps.rules); // To Add validators to each field
      this.createFormControl(fieldProps, field, formGroupFields, validators , fields , isCheckerForm);
    }
    return {formGroupFields , fields};
  }

  createFormControl(fieldProps, field, formGroupFields, validators , fields , isCheckerForm) {
    if (fieldProps['type'] !== 'input-group') {
     
      fields.push({ ...fieldProps, fieldName: field  }); // To Add field Name (key in model) in the fields
      formGroupFields[field] = new FormControl(fieldProps.value, validators); // To Create (new FormControl) to each key of the Object and put it in formGroupFields
    } else {
      let form = this.buildForm(fieldProps['subModel'] , isCheckerForm);
   
      fields.push({
        ...fieldProps,
        fieldName: field,
        subFields : form.fields
      });
      formGroupFields[field] = form.formgroup;
    }
    if (fieldProps['checker'] && isCheckerForm) {
      //Add checker Form control to Form group fields
   
      formGroupFields[fieldProps['checker'].fieldName] = new FormControl(fieldProps['checker'].value, validators);
    }
  }

  private addValidator(rules) {
    // if it has no validators it will send empty array in  validators
    if (!rules) {
      return [];
    }
    // if it has rules it will add it as a validator
    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case 'required':
          return Validators.required;
        case 'userName':
          return this.isAlphabet.bind(this);
          case 'email':
            return this.isEmail.bind(this)
          case 'password':
            return Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
          //add more cases for the future.
      }
    });
    return validators;
  }



  //Username validation
  isAlphabet(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphabetEn = value.split(' ').every((word) =>
      validator.isAlpha(word, 'en-US'));
    const isValidAlphabetAr = value.split(' ').every((word) =>
      validator.isAlpha(word, 'ar-EG'));
    if (value && !isValidAlphabetEn && !isValidAlphabetAr) {
      return { notAlphabet: true };
    }
    return null;
  }

   //Email validation
   isEmail(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !validator.isEmail(value)) {
      return { notEmail: true };
    }
    return null;
  }
}