import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lyric',
  templateUrl: './lyric.component.html',
  styleUrls: ['./lyric.component.css']
})
export class LyricComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  saveLyric(lyric) {
    if (!lyric) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng nhập lyric'
      });
    } else {
      localStorage.setItem('origin_lyrics', lyric);
      var reg = /^\[.+\]$/gim;
      var reg2 = /^\{.+\}$/gim;
      var reg3 = /^\(.+\)$/gim;
      lyric = lyric.split(/\r\n|\r|\n/);
      lyric = lyric.map(l => {
        if (l.trim() == "") {
          return null;
        } else if (l.match(reg) != null || l.match(reg2) != null || l.match(reg3) != null) {
          return null;
        } else {
          return l.trim();
        }
      });
      lyric = lyric.filter(l => l);
      localStorage.setItem('lyrics', JSON.stringify(lyric));
      this.router.navigate(['/edit']);
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('lyrics');
    localStorage.removeItem('origin_lyrics');
  }

}
