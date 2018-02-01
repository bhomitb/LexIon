import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { MediaCapture } from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fileTransfer: FileTransferObject;
  private fileName: string;
  constructor(public navCtrl: NavController, private media: Media, public file: File, private mediaCapture: MediaCapture, private transfer: FileTransfer, private http: HttpClient) {
    this.fileTransfer = this.transfer.create();
  }

  startRecord() {

    this.fileName = this.file.externalRootDirectory.replace(/file:\/\//g, '') + 'audio.wav';
    // Recording to a file
    const audioObject: MediaObject = this.media.create(this.fileName);
    audioObject.startRecord();
    console.log('cache dir: ' + this.file.cacheDirectory);
    console.log('start recording ' + this.fileName);
    setTimeout(() => {
      console.log("reording complete");
      audioObject.stopRecord();
      console.log('duration: ' + audioObject.getDuration());
      audioObject.release();
      console.log()
      audioObject.play();
      console.log('done recording' + this.fileName);
      

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
      // // console.log(this.file.externalApplicationStorageDirectory)
      // // console.log(this.file.tempDirectory)
      // // console.log(this.file.applicationDirectory)
      // console.log(this.file.externalDataDirectory)
      // // console.log(this.file.documentsDirectory)
      // console.log(this.file.externalRootDirectory)
      this.fileTransfer.upload(this.fileName, 'https://abbvie-voice-search.herokuapp.com/audioUpload', options, true)
        .then((data) => {
          // success
          console.log(data.response)
        }, (err) => {
          // error
          console.log(err)
        })
      this.fileTransfer.onProgress(e => {
        console.log(e.eventPhase)
      })
    }, 3000);


    // console.log("recording")
    // this.file.createFile(this.file.tempDirectory || this.file.applicationDirectory, 'audio.wav', true).then((file) => {
    //   console.log(this.file.externalApplicationStorageDirectory)
    //   console.log(this.file.tempDirectory)
    //   console.log(this.file.applicationDirectory)
    //   console.log(this.file.externalDataDirectory)
    //   console.log(this.file.documentsDirectory)
    //   console.log(this.file.dataDirectory)
    //   let mediaObject = this.media.create(this.file.tempDirectory || this.file.applicationDirectory + 'audio.wav');
    //   mediaObject.startRecord();
    //   console.log()
    //   window.setTimeout(() => {
    //     mediaObject.stopRecord();
    //     mediaObject.release();
    //   }, 10000);
    //   if (this.file.checkFile) {
    //     console.log(this.file)
    //     mediaObject.play();
    //   }
    // });
    // // this.mediaCapture.captureAudio().then((data) => {
    // // alert(JSON.stringify(data))
    // // console.log(JSON.stringify(data))
    // // alert(data[0].fullPath)
    // // let options: FileUploadOptions = {
    // //   fileKey: 'audio file',
    // //   fileName: 'audio.wav',
    // //   chunkedMode: false,
    // //   mimeType: 'multipart/form-data',
    // //   headers: {
    // //     "Content-Type": "audio/3gp"
    // //   }
    // // }
    // // this.fileTransfer.upload(data[0].fullPath, 'https://abbvie-voice-search.herokuapp.com/audioUpload', options)
    // //   .then((data) => {
    // //     // success
    // //     console.log(data.response)
    // //   }, (err) => {
    // //     // error
    // //     console.log(err)
    // //   })
    // // this.fileTransfer.onProgress(e => {
    // //   console.log(e.eventPhase)
    // // })

    // // this.http.post('https://abbvie-voice-search.herokuapp.com/audioUpload', )

    // // });
  }
}


