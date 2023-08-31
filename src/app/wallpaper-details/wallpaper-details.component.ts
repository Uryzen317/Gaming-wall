import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallpaper-details',
  templateUrl: './wallpaper-details.component.html',
})
export class WallpaperDetailsComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.index = parseInt(this.route.snapshot.params['index']);
    // localStorage.removeItem(`${this.name}/${this.index}`);

    this.hasRated = localStorage.getItem(`${this.name}/${this.index}`)
      ? true
      : false;
    if (this.hasRated)
      this.tempRate = parseInt(
        localStorage.getItem(`${this.name}/${this.index}`) || '0'
      );

    this.http
      .get(`${this.environment.apiServer}posts/get/${this.name}/${this.index}`)
      .subscribe({
        next: (value: any) => {
          this.post = value;

          //sorting files out
          this.mobileLinks = value.files.filter((file: any) => {
            return file.for === 'موبایل';
          });
          this.desktopLinks = value.files.filter((file: any) => {
            return file.for === 'دستاپ';
          });

          //adding one to the index(skip) nubmer
          this.displayedIndex = this.index + 1;
        },
      });
  }

  environment = environment;
  extrasState: number = 2;
  downloadsState: number = 0;
  name: any;
  index: any;
  displayedIndex!: number;
  files: any;
  mobileLinks: any;
  desktopLinks: any;
  post: any = {
    avatar: '',
  };
  tempRate = 5;
  hasRated = false;

  setExtrasState(state: number) {
    this.extrasState = state;
  }

  setDownloadState(state: number) {
    this.downloadsState = state;
  }

  download(path: string) {
    this.http
      .post(
        `${this.environment.apiServer}posts/download`,
        {
          name: this.name,
          index: this.index,
        },
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (value) => {
          window.location.href = this.environment.cdnServer + path;
        },
      });
  }

  rate(rate: number) {
    this.tempRate = this.hasRated ? this.tempRate : rate;
  }

  submitRate() {
    this.http
      .post(
        `${this.environment.apiServer}posts/rate`,
        { rate: this.tempRate, index: this.index, name: this.name },
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (value) => {
          this.hasRated = true;
          localStorage.setItem(
            `${this.name}/${this.index}`,
            this.tempRate.toString()
          );
        },
      });
  }
}
