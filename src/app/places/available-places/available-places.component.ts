import { Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import type { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';



@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  places = signal<Place[] | undefined>(undefined);
  isFeteching = signal(false); // for fallback text 
  error = signal('');
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placeService = inject(PlacesService);

   private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('duplicateDialog'); // for dialogue box

  // getting data from backend
  ngOnInit() {
    this.isFeteching.set(true);
    const subscription = this.placeService.loadAvailablePlaces().subscribe({
      next: (pictures) => {
        this.places.set(pictures)
      },
      error: (error: Error) => {
        this.error.set(error.message)
      },
      complete: () => {
        this.isFeteching.set(false);
      }
    })
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
  }

  // sending data to backend our empty array and selectedPlace is expected to get the entire interface cuz updating instantly in service
  onSelectedPlace(selectedPlace: Place) {
   const subscription = this.placeService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (response) => console.log(response),
      error: (error: Error) => {
        if (error.message === 'Same Place') {
        // const dialog = document.querySelector('dialog') as HTMLDialogElement;
        // dialog?.showModal();
        this.dialog().nativeElement.showModal();
      }
    }
    })
     this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
  }
  
  closeDialog(dialog: HTMLDialogElement) {
  dialog.close();
  }
}
