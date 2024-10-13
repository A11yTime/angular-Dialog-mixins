import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FocusTrapMixin } from '../../mixins/focus-trap.mixin';

class BaseModalComponent {
  // This can be empty or contain shared logic
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent extends FocusTrapMixin(BaseModalComponent) implements AfterViewInit, OnDestroy, OnChanges {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalContent') modalContent!: ElementRef;
  @ViewChild('firstFocusable') firstFocusable!: ElementRef;
  @ViewChild('lastFocusable') lastFocusable!: ElementRef;

  form: FormGroup;
  private cleanupFocusTrap?: () => void;

  constructor(private fb: FormBuilder) {
    super(); // Call the base class constructor
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    if (this.isOpen) {
      this.cleanupFocusTrap = this.trapFocus(this.firstFocusable, this.lastFocusable, () => this.onClose());
    }
  }

  ngOnChanges() {
    if (this.isOpen) {
      setTimeout(() => {
        this.cleanupFocusTrap = this.trapFocus(this.firstFocusable, this.lastFocusable, () => this.onClose());
      });
    }
  }

  ngOnDestroy() {
    if (this.cleanupFocusTrap) {
      this.cleanupFocusTrap(); // Clean up the focus trap when component is destroyed
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      this.onClose(); // Close modal after submission
    }
  }

  onClose() {
    this.close.emit(); // Emit close event to parent component
  }
}
