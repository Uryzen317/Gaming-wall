import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallpaper-details-by-id',
  templateUrl: './wallpaper-details-by-id.component.html'
})
export class WallpaperDetailsByIdComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router,
  ) {}
  
  ngOnInit(): void {  
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'] || "";
    // localStorage.removeItem(`${this.name}/${this.index}`);

    this.hasRated = localStorage.getItem(`${this.id}`) ? true : false;
    if (this.hasRated)
      this.tempRate = parseInt(localStorage.getItem(`${this.id}`) || '0');

    this.http
      .get(`${this.environment.apiServer}posts/getById/${this.id}`)
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
          
          this.downloadsState = this.mobileLinks.length > 0 ? 0 : 1 ;
        }
      });
  }

  environment = environment;
  extrasState: number = 2;
  downloadsState: number = 0;
  name: any;
  id: any;
  displayedIndex!: number;
  files: any;
  mobileLinks: any;
  desktopLinks: any;
  post: any = {
    avatar: ''
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
        `${this.environment.apiServer}posts/downloadById`,
        {
          id: this.id
        },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          window.location.href = this.environment.cdnServer + path;
        }
      });
  }

  rate(rate: number) {
    this.tempRate = this.hasRated ? this.tempRate : rate;
  }

  submitRate() {
    this.http
      .post(
        `${this.environment.cdnServer}posts/rateById`,
        { rate: this.tempRate, id: this.id },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          this.hasRated = true;
          localStorage.setItem(`${this.id}`, this.tempRate.toString());
        }
      });
  }
}
