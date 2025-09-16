import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { type Place } from '../place.model';
import { PlacesService } from '../places.service';


@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
    isFeteching = signal(false); // for fallback text 
    error = signal('');

    private destroyRef = inject(DestroyRef);
    private placeService = inject(PlacesService);
    places = this.placeService.loadedUserPlaces;
  
    // getting data from backend but from user-place that is added by the available.ts by PUT method 
    ngOnInit() {
      this.isFeteching.set(true);
      const subscription = this.placeService.loadUserPlaces().subscribe({
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

  onRemovePlace(selectedPlace: Place) {
    const subscription = this.placeService.removeUserPlace(selectedPlace).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}
