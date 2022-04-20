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
  dinoY = 0;

  error = null;
  authTriedBefore = false;

  isJumping = false;
  isAnimationOn = true;
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
    this.isAnimationOn = false;
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img1 = new Image(30, 30);
    this.img1.src = 'assets/img/dino.png';

    this.img2 = new Image(17, 30);
    this.img2.src = 'assets/img/cactus.png';

    this.ctx.drawImage(this.img2, this.cactusX, 17, 120, 210);
    this.ctx.drawImage(this.img1, 0, this.dinoY, 150, 150);

    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    this.subscribe = interval(100).subscribe(() => {
      this.onForward();
    });
  }

  // mettere cactus e dinosauro allo stesso livello

  @HostListener('keyup.Space') onJump() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.dinoY = this.dinoY === 0 ? -80 : 0;
    this.ctx.drawImage(this.img1, 0, this.dinoY, 150, 150);
    this.ctx.drawImage(this.img2, this.cactusX, 17, 120, 210);

    this.salita();
    setTimeout(() => {
      this.subscribe2.unsubscribe();
      setTimeout(() => {
        this.discesa();
      }, 500);
      setTimeout(() => {
        this.subscribe3.unsubscribe();
      }, 800);
    }, 400);
  }

  salita() {
    this.subscribe2 = interval(100).subscribe(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      while (this.dinoY > -80) {
        this.dinoY = this.dinoY - 20;
        this.ctx.drawImage(this.img1, 0, this.dinoY, 150, 150);
        this.ctx.drawImage(this.img2, this.cactusX, 17, 120, 210);
      }
    });
  }

  discesa() {
    this.subscribe3 = interval(100).subscribe(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      while (this.dinoY < 0) {
        this.dinoY = this.dinoY + 40;
        this.ctx.drawImage(this.img1, 0, this.dinoY, 150, 150);
        this.ctx.drawImage(this.img2, this.cactusX, 17, 120, 210);
      }
    });
  }

  onForward() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.cactusX - 10 > -50) {
      this.cactusX = this.cactusX - 10;
      this.ctx.drawImage(this.img2, this.cactusX, 17, 120, 210);
    } else {
      this.cactusX = this.canvas.width - 50;
      this.ctx.drawImage(this.img2, this.cactusX, 17, 120, 210);
    }
    this.ctx.drawImage(this.img1, 0, this.dinoY, 150, 150);
    if (this.cactusX < 75 && this.dinoY > -20) {
      this.isGameOver = true;
    }
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
