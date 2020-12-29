import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  syncLyrics = [];
  txt = null;
  sbv = null;
  srt = null;
  currentSbv = "0:00:00.000";

  constructor() { }

  async makeDownload() {
    var zip = new JSZip();
    zip.file(`${localStorage.getItem('title')}.txt`, this.txt);
    zip.file(`${localStorage.getItem('title')}.sbv`, this.sbv);
    zip.file(`${localStorage.getItem('title')}.srt`, this.srt);
    const blob = await zip.generateAsync({ type: "blob" });
    const element = document.createElement("a");
    element.setAttribute("href", window.URL.createObjectURL(blob));
    element.setAttribute("download", `${localStorage.getItem('title')}_BAONGAYCORP_LYRIC_FILE.zip`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  ngOnInit(): void {
    const that = this;
    that.syncLyrics = JSON.parse(localStorage.getItem('sync_lyrics'));
    that.syncLyrics.map((l, index) => {
      if (index == 0) {
        that.txt = `${l.second} ${l.lyric}`;
      } else if (index == (that.syncLyrics.length - 1)) {
        that.txt = `${that.txt}\n${l.second} ${l.lyric}`;
      } else {
        that.txt = `${that.txt}\n${l.second} ${l.lyric}`;
      }
    });

    that.syncLyrics.map((l, index) => {
      if (index == 0) {
        that.sbv = `${l.time},${that.syncLyrics[index + 1].time}\n${l.lyric}`;
        that.srt = `1\n${l.time.replace(".", ",")} --> ${that.syncLyrics[index + 1].time.replace(".", ",")}\n${l.lyric}`;
      } else if (index == (that.syncLyrics.length - 1)) {
        that.sbv = `${that.sbv}\n\n${l.time},${l.time}\n${l.lyric}`;
        that.srt = `${that.srt}\n\n${index + 1}\n${l.time.replace(".", ",")} --> ${l.time.replace(".", ",")}\n${l.lyric}`;
      } else {
        that.sbv = `${that.sbv}\n\n${l.time},${that.syncLyrics[index + 1].time}\n${l.lyric}`;
        that.srt = `${that.srt}\n\n${index + 1}\n${l.time.replace(".", ",")} --> ${that.syncLyrics[index + 1].time.replace(".", ",")}\n${l.lyric}`;
      }
    });
  }

}
