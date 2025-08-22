import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.html',
  styleUrls: ['./error404.css']
})
export class Error404 implements OnInit, OnDestroy {
  counter = 5; // countdown seconds
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        clearInterval(this.intervalId);
        this.router.navigate(['/']); // redirect to home
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
