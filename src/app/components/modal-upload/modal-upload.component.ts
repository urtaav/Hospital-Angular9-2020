import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css'],
})

export class ModalUploadComponent implements OnInit {
  imageUpload: File;
  imageTemp: any;

  @ViewChild('inputImage')
  inputImage: ElementRef;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {}

  resetInputFile() {
    this.inputImage.nativeElement.value = '';
  }
  
  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imagenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => (this.imageTemp = reader.result);
  }

  uploadImage() {
    this._uploadFileService
      .uploadFile(
        this.imageUpload,
        this._modalUploadService.type,
        this._modalUploadService.id
      )
      .then((resp) => {
        this._modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch((err) => {
        console.log('error en la carga', err);
      });
  }

  closeModal() {
    this.imageTemp = null;
    this.imageUpload = null;
    this._modalUploadService.hiddenModal();
    this.resetInputFile();
  }
}
