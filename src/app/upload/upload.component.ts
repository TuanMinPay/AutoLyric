import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  isLoading: boolean = false;

  dragOver: boolean = false;
  onDragOver(ev: DragEvent) {
    this.dragOver = true;
  }
  onDragLeave(ev: DragEvent) {
    this.dragOver = false;
  }

  onDrop(ev: DragEvent) {
    this.dragOver = false;
    ev.preventDefault();
    this.uploadMp3(ev.dataTransfer.files[0]);
  }

  checkFileValid(name: string) {
    const regexMp3 = /\.(?:mp3|wav|flac)$/gm;
    return regexMp3.exec(name);
  }

  FILE_NAME_REGEX = /(.+)\/(.+)$/;

  next: boolean = false;

  uploadFileSelected(file) {
    this.uploadMp3(file.target.files[0]);
  }

  fileName: any = null;

  uploadMp3(file) {
    const that = this;
    var filename: any = file.name;
    that.isLoading = true;
    if (this.checkFileValid(filename) != null) {
      localStorage.setItem('title', filename.replace(/\.(?:mp3|wav|flac)$/gm, ''));
      // var formData = new FormData();
      // formData.append("file", file);
      that.fileName = filename;
      localStorage.setItem('audio_url', window.URL.createObjectURL(file));
      that.next = true;
      that.isLoading = false;
      // axios.post('http://localhost:8888/api/upload/audio', formData).then(function (response) {
      //   that.fileName = filename;
      //   localStorage.setItem('audio_url', response.data);
      //   that.next = true;
      //   that.isLoading = false;
      // }).catch(function (error) {
      //   that.isLoading = false;
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Something went wrong',
      //     text: 'Oops...'
      //   });
      //   console.log(error);
      // });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'The file is not audio',
        text: 'Oops...'
      });
      that.isLoading = false;
    }
  }

  ngOnInit(): void {
    localStorage.clear();
  }

}
