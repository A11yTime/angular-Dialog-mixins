import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';

export function FocusTrapMixin<T extends new (...args: any[]) => {}>(Base: T) {
  return class extends Base {
    private previousActiveElement: Element | null = null;

    trapFocus(firstFocusable: ElementRef, lastFocusable: ElementRef, onClose: () => void) {
      this.previousActiveElement = document.activeElement;
      firstFocusable.nativeElement.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstFocusable.nativeElement) {
              event.preventDefault();
              lastFocusable.nativeElement.focus();
            }
          } else {
            if (document.activeElement === lastFocusable.nativeElement) {
              event.preventDefault();
              firstFocusable.nativeElement.focus();
            }
          }
        } else if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (this.previousActiveElement) {
          (this.previousActiveElement as HTMLElement).focus();
        }
      };
    }
  };
}
