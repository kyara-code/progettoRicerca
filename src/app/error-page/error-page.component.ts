import { interval, Subscription } from 'rxjs';
import { AuthService } from './../service/auth.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  @ViewChild('snowman') snowman: ElementRef = null;
  @ViewChild('fire') fire: ElementRef = null;

  error = null;
  authTriedBefore = false;

  isJumping = false;
  isAnimationOn = true;
  subscribe: Subscription = null;
  isGameOver: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.error = this.authService.error;
    if (this.error.status !== 'Unknown Route') {
      this.authTriedBefore = true;
    }

    // interval(300).subscribe((count) => {
    //   let bottomFire = this.fire.nativeElement.getBoundingClientRect().bottom;
    //   let leftSnowman = this.snowman.nativeElement.getBoundingClientRect().left;
    //   let leftFire = this.fire.nativeElement.getBoundingClientRect().left;
    //   let bottomSnowman =
    //     this.fire.nativeElement.getBoundingClientRect().bottom;
    //   if (leftFire === leftSnowman) {
    //     console.log('game over');
    //     this.isGameOver = true;
    //   }
    // });
  }

  onJump() {
    this.isJumping = true;
    setTimeout(() => {
      this.isJumping = false;
    }, 800);

    console.log(this.fire.nativeElement.getBoundingClientRect().bottom);
    console.log(this.snowman.nativeElement.getBoundingClientRect().bottom);
  }

  onStopAnimation() {
    this.isAnimationOn = !this.isAnimationOn;
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
