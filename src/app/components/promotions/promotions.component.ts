import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Player } from '../../interfaces/player';
import { HttpService } from '../../services/http.service';
import { PlacePipe } from '../../pipes/nth.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, PlacePipe, FormsModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css',
})
export class PromotionsComponent implements OnInit {
  leaderBoard: Player[] = [];
  options: string[] = ['ALL', 'I', 'II', 'III', 'IV'];
  selectedOption: string = 'ALL';
  section: number = 1;
  oldSection: number = 1;
  private storedRotation: number = 0;

  @ViewChild('spinner') spinner!: ElementRef;

  constructor(private http: HttpService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getLeaderBoard();
  }

  getLeaderBoard() {
    this.http.getLeaderBoard(this.selectedOption).subscribe((data) => {
      this.leaderBoard = data;
    });
  }

  onOptionClick(option: string) {
    this.selectedOption = option;
    this.getLeaderBoard();
  }

  spinCircle() {
    if (!this.spinner || this.oldSection === this.section) {
      return;
    }

    const degreesPerSection = 36;
    const fullSpins = 5;

    const targetVisualAngle = (this.section - 1) * degreesPerSection;

    const currentVisualAngle = ((this.storedRotation % 360) + 360) % 360;

    let angleDifference = targetVisualAngle - currentVisualAngle;

    if (angleDifference > 0) {
      angleDifference -= 360;
    }

    this.storedRotation += fullSpins * -360 + angleDifference;

    this.oldSection = this.section;
    this.renderer.setStyle(
      this.spinner.nativeElement,
      'transform',
      `rotate(${this.storedRotation}deg)`
    );
  }
}
