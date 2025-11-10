import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { HttpService } from '../../services/http.service';
import { PlacePipe } from "../../pipes/nth.pipe";

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, PlacePipe],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css',
})
export class PromotionsComponent implements OnInit {
  leaderBoard: Player[] = [];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getLeaderBoard();
  }

  getLeaderBoard() {
    this.http.getLeaderBoard().subscribe((data) => {
      this.leaderBoard = data;
    });
  }
}
