import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { v4 } from 'uuid';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  generateExtension(fileType: string): string {
    switch (fileType) {
      case 'image/png':
        return 'png';
      case 'image/tiff':
        return 'tiff';
      case 'image/svg+xml':
        return 'svg';
      case 'image/webp':
        return 'webp';
      case 'image/jpeg':
        return 'jpeg';
      case 'image/gif':
        return 'gif';
      default:
        return '.bmp';
    }
  }

  uploadImageForPost(file: File) {
    const fileExtension = this.generateExtension(file.type);
    const filePath = `posts/${v4()}.${fileExtension}`;
    const uploadTask = this.storage.upload(filePath, file);
    const storageRef = this.storage.ref(filePath);
    return {
      task: uploadTask,
      ref: storageRef
    };
  }
}
