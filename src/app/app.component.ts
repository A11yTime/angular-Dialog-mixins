import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent], // Add ModalComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed to styleUrls
})
export class AppComponent {
  title = 'dialog';
  isModalOpen: boolean = false; // Track modal state

  @ViewChild('openModalButton') openModalButton!: ElementRef; // Declare @ViewChild here

  openModal() {
    this.isModalOpen = true; // Open the modal
  }

  onModalClose() {
    this.isModalOpen = false; // Close the modal
    this.openModalButton.nativeElement.focus(); // Focus back on the button
  }
}
