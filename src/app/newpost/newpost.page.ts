import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.page.html',
  styleUrls: ['./newpost.page.scss'],
})
export class NewpostPage implements OnInit {
  imageForm: FormGroup = this.formBuilder.group({
    image: new FormControl('', [Validators.required]),
    imageSource: new FormControl('', [Validators.required]),
    caption: new FormControl('', [Validators.required]),
  });
  selectedImage?: File;
  imagePreview?: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.selectedImage = file;
      this.imageForm.patchValue({ imageSource: file });
      this.imageForm.get('image')?.updateValueAndValidity();

      // Generate a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        console.log(event.target.result);
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.imageForm.valid && this.selectedImage) {
      // Handle the image upload here (e.g., send it to a server)
      console.log('Form data:', this.imageForm.value);
      console.log('Selected image:', this.selectedImage);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }
}
