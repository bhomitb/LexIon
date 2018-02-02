import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { MediaCapture } from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Storage } from '@ionic/storage';
const MEDIA_FILES_KEY = 'mediaFiles';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  audioURI:any;
  audioName:any;
  fileTransfer: FileTransferObject;
  private fileName: string;
  
  constructor(public navCtrl: NavController, 
    private media: Media,
     public file: File, 
     private mediaCapture: MediaCapture, 
     private transfer: FileTransfer, 
     private http: HttpClient,
     private storage: Storage) {
    this.fileTransfer = this.transfer.create();
  }
  
  mediaFiles = [];

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }
  startRecord() {
    // //Media
    // this.fileName = this.file.externalRootDirectory.replace(/file:\/\//g, '') + 'audio.wav';
    // // Recording to a file
    // const audioObject: MediaObject = this.media.create(this.fileName);
    // audioObject.startRecord();
    // console.log('cache dir: ' + this.file.cacheDirectory);
    // console.log('start recording ' + this.fileName);
    // setTimeout(() => {
    //   console.log("reording complete");
    //   audioObject.stopRecord();
    //   console.log('duration: ' + audioObject.getDuration());
    //   audioObject.release();
    //   console.log()
    //   audioObject.play();
    //   console.log('done recording' + this.fileName);
      

    //   let options: FileUploadOptions = {
    //     fileKey: 'audio file',
    //     fileName: 'audio.wav',
    //     chunkedMode: false,
    //     httpMethod: 'POST',
    //     mimeType: "audio/wav",
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   this.fileTransfer.upload(this.fileName, 'https://abbvie-voice-search.herokuapp.com/audioUpload', options, true)
    //     .then((data) => {
    //       // success
    //       console.log(data.response)
    //     }, (err) => {
    //       // error
    //       console.log(err)
    //     })
    //   this.fileTransfer.onProgress(e => {
    //     console.log(e.eventPhase)
    //   })
    // }, 3000);
    //Media Capture
    
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    }, (err: CaptureError) => console.error(err));
  }
  upload(){
let options: FileUploadOptions = {
      fileKey: 'audio file',
      fileName: 'audio.wav',
      chunkedMode: false,
      httpMethod: 'POST',
      mimeType: "audio/wav",
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    this.fileTransfer.upload(this.audioURI, 'https://abbvie-voice-search.herokuapp.com/audioUpload', options, true)
      .then((data) => {
        // success
        console.log(data.response)
      }, (err) => {
        // error
        console.log(err)
      })
}
  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }
  play(myFile) {
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      console.log("Not an audio file")
    }
  }
  }





