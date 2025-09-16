import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { type Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService); // for error dialogue box

  private userPlaces = signal<Place[]>([]); // used in tap()
  private httpclient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly(); // used in user.ts component

  loadAvailablePlaces() {
      return this.fetchPlaces(
      'http://localhost:3000/places' , 
      'Something went wrong while trying to fetch data. Please try agian later!'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places' , 
      'Something went wrong while trying to fetch your Favourite Places. Please try agian later!'
    ).pipe(tap({
      next : (userSelectedPlaces) => this.userPlaces.set(userSelectedPlaces)
    }))
  }

  addPlaceToUserPlaces(selectedPlace: Place) {
    const prevPlaces = this.userPlaces(); // for displaying error pf put method
    //this variable stores the inital value/last value in-case error in PUT method

    // this some prevents adding same place again and again 
   if (!prevPlaces.some((list) => list.id === selectedPlace.id)) {
    this.userPlaces.set([...prevPlaces, selectedPlace])
   } else if (prevPlaces.some((list) => list.id === selectedPlace.id)) {
    // alert('This place is already added to your favourite Places')
    return throwError(() => new Error('Same Place')); // for dialogue box
   }

    return this.httpclient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id
    })
    .pipe(catchError((error) => {
      this.userPlaces.set(prevPlaces);
      // for displaying error pf put method
      this.errorService.showError('Failed to store the selected place');//showerror() in the error service
      return throwError(() => new Error('Failed to store the selected place'));
      }) )
      // this error is for PUT method
  }

  removeUserPlace(selectedPlace: Place) {
     const prevPlaces = this.userPlaces();
   
    if (prevPlaces.some((list) => list.id === selectedPlace.id)) {
      this.userPlaces.set(prevPlaces.filter((place) => place.id !== selectedPlace.id)); // gives the array of places except the removed one
    }
    return this.httpclient.delete('http://localhost:3000/user-places/' + selectedPlace.id).pipe(catchError((error) => {
      this.userPlaces.set(prevPlaces);
      // for displaying error 
      this.errorService.showError('Failed to remove the selected place');//showerror() in the error service
      return throwError(() => new Error('Failed to remove the selected place'));
      }) )
  }

  private fetchPlaces(url: string , message: string) {
    return this.httpclient.get<{places: Place[]}>(url)
      .pipe(map((resDate) => resDate.places ), catchError((error) => {
         console.log(error);
         return throwError(() => new Error(message));
      }) 
    )
  } // gets the data from the backend using the url(which is passed as paramter and accessed in their seperate functions)

}
