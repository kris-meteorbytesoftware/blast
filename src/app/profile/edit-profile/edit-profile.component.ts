import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/helpers/services/authentication.service';
import { UserService } from 'src/app/helpers/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user?: UserModel;
  profileForm: FormGroup;
  imagePreview: string = '';
  profileName: string = '';
  initials: string = '';
  selectedFile: File | null = null; // Variable to hold the selected file

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.profileForm = this.formBuilder.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      name: [''],
      photoUrl: [''],
    });
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((user) => {
      this.user = user || ({} as UserModel);
      this.profileForm.patchValue(this.user);
      this.imagePreview = this.user.profileUrl;
    });

    // Add a valueChanges listener to update profileName
    this.profileForm.controls['firstName'].valueChanges.subscribe(
      (firstName) => {
        this.createInititals();
      }
    );
    this.profileForm.controls['lastName'].valueChanges.subscribe((lastName) => {
      this.createInititals();
    });
  }

  private createInititals(): void {
    const firstName = this.profileForm.controls['firstName'].value;
    const lastName = this.profileForm.controls['lastName'].value;
    this.profileForm.controls['name'].setValue(`${firstName} ${lastName}`);
    this.profileName = `${firstName} ${lastName}`;
    let initials = '';

    for (let i = 0; i < this.profileName.length; i++) {
      if (this.profileName.charAt(i) === ' ') {
        continue;
      }

      if (
        this.profileName.charAt(i) === this.profileName.charAt(i).toUpperCase()
      ) {
        initials += this.profileName.charAt(i);

        if (initials.length == 2) {
          break;
        }
      }
    }

    this.initials = initials;
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];

      this.previewImage(this.selectedFile);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Create a FormData object and append the form values and file
      const formData = new FormData();
      formData.append('email', this.profileForm.get('email')?.value);
      formData.append('firstName', this.profileForm.get('firstName')?.value);
      formData.append('lastName', this.profileForm.get('lastName')?.value);
      formData.append('phone', this.profileForm.get('phone')?.value);

      if (this.selectedFile) {
        formData.append(
          'profilePicture',
          this.selectedFile,
          this.selectedFile.name
        );
      }

      this.userService.saveProfile(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.authService.saveUser(data);
        },
        error: (err) => {
          console.log(err);
        },
      });

      // For this example, we'll log the formData for demonstration
      console.log('Form Data to Submit:', formData);
    } else {
      console.error('Form is not valid. Cannot submit.');
    }
  }
}
