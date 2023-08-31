import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.searchBox.valueChanges
      .pipe(
        filter(text => text.length > 2),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(searchTerm =>
          ajax(`${this.environment.apiServer}games/search/${searchTerm}`)
        )
      )
      .subscribe(value => {
        this.searchRes = value.response;
        if (this.searchRes.length > 5) {
          let counter = 0;
          this.searchRes = this.searchRes.filter((data: any) => {
            counter++;
            if (counter < 6) return data;
          });
        }
      });

    this.searchBox.valueChanges.subscribe({
      next: value => {
        if (!value) {
          this.searchRes = [];
        }
      }
    });

    this.http
      .get(`${this.environment.apiServer}mainPage/list`, {
        responseType: 'json'
      })
      .subscribe({
        next: value => {
          this.games = value;
        }
      });
  }

  searchBox = new FormControl();
  searchRes: any;
  environment = environment;
  games: any;
  //     [
  //     {
  //       name: 'ghost of tsushima',
  //       primaryColor: '#991b1b',
  //       secondaryColor: '#f9fafb',
  //       background: '../../assets/game-section/got-main.jpg',
  //       imagesUrl: [
  //         '../../assets/game-section/got1.jpg',
  //         '../../assets/game-section/got2.jpg',
  //         '../../assets/game-section/got3.jpg',
  //         '../../assets/game-section/got4.jpg',
  //         '../../assets/game-section/got5.jpg'
  //       ],
  //       imagesLink: [
  //         'google.com',
  //         'google.com',
  //         'google.com',
  //         'google.com',
  //         'google.com'
  //       ],
  //       moreLink: 'google.com'
  //     },
  //     {
  //       index: 0, //
  //       game: {
  //         avatar: '',
  //         name: '',
  //         count: ''
  //       },
  //       primaryColor: '',
  //       secondaryColor: '',
  //       images: [
  //         //posts
  //         {},
  //         {},
  //         {},
  //         {},
  //         {}
  //       ]
  //     }
  //   ];
}
