import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  titleSelected = null;
  arrLyric = [];
  @ViewChild('audioElement', { static: false }) public _audioRef: ElementRef;
  private audio: HTMLMediaElement;
  firstClick = false;
  constructor() {
  }

  output = [];
  currentUndo = false;
  currentIndex = 0;
  nextStepCheck = false;

  pushOutput(second, time, lyric, timestamp) {
    this.output.push({
      second,
      time,
      lyric,
      timestamp
    });
  }

  msToHMS(duration: number) {
    var seconds = (duration / 1000) % 60, minutes = (duration / (1000 * 60)) % 60;
    return (minutes < 10) ? "0" + minutes : minutes + ":" + (seconds < 10) ? "0" + seconds : seconds;
  }

  tap() {
    const that = this;
    if (!that.firstClick) {
      that.firstClick = true;
      that.audio.play();
      that.pushOutput("00:00", "0:00:00.000", that.arrLyric[that.currentIndex], "0");
      that.currentIndex = that.currentIndex + 1;
    } else if (that.currentIndex <= (that.arrLyric.length - 1)) {
      document.querySelector(`li[data-index='${that.currentIndex - 1}']`).classList.add('line_done');
      var hour = `0${Math.floor(that.audio.currentTime / 3600)}`;
      var minutes = `0${Math.floor(that.audio.currentTime / 60)}`;
      var seconds = `0${Math.floor(that.audio.currentTime - parseInt(minutes) * 60)}`;
      var milliseconds = that.audio.currentTime.toString().substr(-3);
      var dur = `${minutes.substr(-2)}:${seconds.substr(-2)}`;
      var _dur = `${hour.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}.${milliseconds}`;
      that.pushOutput(dur, _dur, that.arrLyric[that.currentIndex], that.audio.currentTime);
      document.querySelector(`li[data-index='${that.currentIndex}']`).scrollIntoView({ behavior: 'smooth', block: 'center' });
      that.currentIndex = that.currentIndex + 1;
    } else if (that.currentIndex > (that.arrLyric.length - 1)) {
      document.querySelector(`li[data-index='${that.currentIndex - 1}']`).classList.add('line_done');
      that.audio.pause();
      that.nextStepCheck = true;
      localStorage.setItem('sync_lyrics', JSON.stringify(that.output));
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.getModifierState('Control')) {
      this.tap();
    }
  }

  undo() {
    const that = this;

    that.audio.pause();
    if (that.currentIndex <= (that.arrLyric.length - 1)) {
      document.querySelector(`li[data-index='${that.currentIndex - 2}']`).classList.remove('line_done');
      let obj = that.output.pop();
      that.currentIndex = that.currentIndex - 1;
      that.audio.currentTime = obj.timestamp;
      console.log(1, that.output);
    } else if (that.currentIndex > (that.arrLyric.length - 1)) {
      document.querySelector(`li[data-index='${that.currentIndex - 1}']`).classList.remove('line_done');
      that.output.pop();
      that.currentIndex = that.currentIndex - 1;
      document.querySelector(`li[data-index='${that.currentIndex - 1}']`).classList.remove('line_done');
    }
    that.nextStepCheck = false;
  }

  nextStep() {
    window.location.href = '/export';
  }

  setSpeed(speed) {
    this.audio.playbackRate = speed;
  }

  ngOnInit(): void {
    this.titleSelected = localStorage.getItem('title');
    this.arrLyric = JSON.parse(localStorage.getItem('lyrics'));
    // localStorage.removeItem('sync_lyrics');
  }

  public ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    this.audio.src = localStorage.getItem('audio_url');
  }

}
