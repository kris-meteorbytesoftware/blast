import { UserModel } from 'src/app/models/user.model';
import { GeolocationService } from './../helpers/services/geolocation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { AuthenticationService } from '../helpers/services/authentication.service';
import { BlastService } from '../helpers/services/blast.service';
import { BusinessModel } from '../models/business.model';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.page.html',
  styleUrls: ['./newpost.page.scss'],
})
export class NewpostPage implements OnInit {
  @ViewChild('imageUpload', { static: true }) imageUpload: any;

  user: UserModel = {} as UserModel;
  userId: number = 0;
  businessId: number = 0;
  business: BusinessModel = {} as BusinessModel;

  selectedFile?: File;
  previewUrl?: string | ArrayBuffer | null;

  createPostForm: FormGroup = new FormGroup({
    blastText: new FormControl(''),
    blastSavedCap: new FormControl(''),
    imageUri: new FormControl(''),
  });
  isError = false;
  uploadedFiles: any = [];

  userLocation = { lat: 0, lng: 0 };
  errorMessage: string = '';
  notificationType = 'is-danger';
  uploadPercent?: Observable<number>;
  fileUploadPreview?: string;
  downloadURL?: Observable<string>;
  imageUrl?: string;
  people?: number;

  pondOptions = {
    class: 'image-upload',
    multiple: true,
    maxFiles: 4,
    labelIdle: 'Drop files here or Browse',
    acceptedFileTypes: 'image/jpeg, image/png',
    allowImageExifOrientation: true,
    allowImagePreview: true,
    imagePreviewMinHeight: 44,
    imagePreviewMaxHeight: 100,
    imagePreviewMaxFileSize: 20,
    allowImageCrop: true,
    imageCropAspectRatio: '1:1',
    allowImageTransform: true,
    // server: {
    // 	url: `${environment.BASE_URL}users/upload`,
    // 	process: {
    // 		onload: response => this.uploadedFiles.push(response),
    // 		onerror: response => console.log('onerror', response)
    // 	},
    // 	revert: (uniqueFileId, load) => {
    // 		load();
    // 	}
    // }
  };

  constructor(
    private blastService: BlastService,
    private router: Router,
    private geolocationService: GeolocationService,
    private authService: AuthenticationService
  ) {
    authService.user$.subscribe((u) => {
      this.user = u || ({} as UserModel);
    });
  }

  ngOnInit(): void {}

  get blastText() {
    return this.createPostForm.get('blastText');
  }
  get blastSavedCap() {
    return this.createPostForm.get('blastSavedCap');
  }
  get imageUri() {
    return this.createPostForm.get('imageUri');
  }

  createPost() {
    //this.createPostForm.value.media = this.uploadedFiles;
    console.log('posting', this.blastText?.value);

    this.geolocationService.getCurrentPosition().subscribe({
      next: (position: GeolocationPosition) => {
        const blastText: string = this.blastText?.value;
        const blastSavedCap: number = this.blastSavedCap?.value;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const data = {
          blastText: this.blastText?.value,
          blastSavedCap: this.blastSavedCap?.value || 20,
          lat,
          lng,
        };
        console.log('posting', data);
        this.blastService.newBlast(data, this.selectedFile).subscribe({
          next: (data) => {
            console.log('success', data);
            this.createPostForm.reset();
            this.router.navigateByUrl('/feed');
          },
          error: (err) => {
            console.log('error', err);
          },
        });
      },
      error: (error: GeolocationPositionError) => {
        console.error('Error getting location:', error.message);
      },
    });
  }

  // getGeoLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.userLocation = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         console.log(this.userLocation);
  //       },
  //       (failure) => {
  //         if (
  //           failure.message.indexOf('Only secure origins are allowed') === 0
  //         ) {
  //           alert('Only secure origins are allowed by your browser.');
  //         }
  //       }
  //     );
  //   } else {
  //     console.log('geolocation not supported');
  //   }
  // }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  uploadFile(event: File) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   let filePath = 'blast/';
    //   if (this.businessId > 0) {
    //     filePath += `business/${this.businessId}/` + uuIdv4();
    //   } else {
    //     filePath += `user/${this.userId}/` + uuIdv4();
    //   }
    //   const fileRef = this.storage.ref(filePath);
    //   const task = this.storage.upload(filePath, file);
    //   // observe percentage changes
    //   this.uploadPercent = task.percentageChanges();
    //   // get notified when the download URL is available
    //   task
    //     .snapshotChanges()
    //     .pipe(
    //       finalize(() => {
    //         this.downloadURL = fileRef.getDownloadURL();
    //         this.downloadURL.subscribe((url) => (this.imageUrl = url));
    //         //this.imageUri.setValue(fileRef.getDownloadURL());
    //       })
    //     )
    //     .subscribe();
    // }
  }

  scan() {
    this.blastService.scan(this.user.business.id).subscribe({
      next: (data) => {
        this.people = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
