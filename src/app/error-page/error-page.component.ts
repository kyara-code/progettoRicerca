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

  canvas;
  ctx;
  img1;
  img2;

  cactusX = 60;
  dinoY = 10;

  error = null;
  authTriedBefore = false;

  isJumping = false;
  isAnimationOn = false;
  subscribe: Subscription = null;
  isGameOver: boolean = false;

  subscribe2: Subscription = null;
  subscribe3: Subscription = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.error = this.authService.error;
    if (this.error.status !== 'Unknown Route') {
      this.authTriedBefore = true;
    }
  }

  onStart() {
    this.isAnimationOn = true;
    this.isGameOver = false;
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.cactusX = this.canvas.width - 50;
    this.ctx = this.canvas.getContext('2d');
    this.img1 = new Image(30, 30);
    this.img1.src = 'assets/img/dino.png';

    this.img2 = new Image(17, 30);
    this.img2.src = 'assets/img/cactus.png';

    this.ctx.drawImage(this.img2, this.cactusX, 17, 90, 160);
    this.ctx.drawImage(this.img1, 0, this.dinoY, 130, 130);

    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    this.subscribe = interval(100).subscribe(() => {
      this.onForward();
    });
  }

  @HostListener('keydown.ArrowUp') onJump() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.dinoY = this.dinoY === 0 ? -80 : 0;
    // this.ctx.drawImage(this.img1, 0, this.dinoY, 110, 110);
    // this.ctx.drawImage(this.img2, this.cactusX, 17, 90, 160);

    this.salita();
    setTimeout(() => {
      this.subscribe2.unsubscribe();
      setTimeout(() => {
        this.discesa();
      }, 700);
      setTimeout(() => {
        this.subscribe3.unsubscribe();
      }, 1000);
    }, 400);
  }

  salita() {
    this.subscribe2 = interval(100).subscribe(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      while (this.dinoY > -40) {
        this.dinoY = this.dinoY - 12.5;
        this.ctx.drawImage(this.img1, 0, this.dinoY, 110, 110);
        this.ctx.drawImage(this.img2, this.cactusX, 17, 90, 160);
      }
    });
  }

  discesa() {
    this.subscribe3 = interval(100).subscribe(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      while (this.dinoY < 10) {
        this.dinoY = this.dinoY + 25;
        this.ctx.drawImage(this.img1, 0, this.dinoY, 110, 110);
        this.ctx.drawImage(this.img2, this.cactusX, 17, 90, 160);
      }
    });
  }

  onForward() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.cactusX - 10 > -50) {
      this.cactusX = this.cactusX - 10;
      this.ctx.drawImage(this.img2, this.cactusX, 17, 90, 160);
    } else {
      this.cactusX = this.canvas.width - 50;
      this.ctx.drawImage(this.img2, this.cactusX, 17, 90, 160);
    }
    this.ctx.drawImage(this.img1, 0, this.dinoY, 110, 110);
    if (this.cactusX < 40 && this.dinoY > -10) {
      this.onStopAnimation();
      this.isGameOver = true;
    }
  }

  onStopAnimation() {
    this.cactusX = 60;
    this.dinoY = 10;
    this.isAnimationOn = false;
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }

    if (this.subscribe2) {
      this.subscribe2.unsubscribe();
    }
    if (this.subscribe3) {
      this.subscribe3.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
