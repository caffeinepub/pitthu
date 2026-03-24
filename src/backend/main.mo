import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Int "mo:core/Int";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  type Status = { #pending; #confirmed; #completed; #cancelled };

  type Location = {
    address : Text;
    coordinates : (Float, Float);
  };

  type RideBooking = {
    user : Principal;
    pickupLocation : Location;
    dropoffLocation : Location;
    time : Time.Time;
    status : Status;
    passengers : Nat;
    price : Nat;
  };

  type DroneDelivery = {
    user : Principal;
    pickupLocation : Location;
    dropoffLocation : Location;
    time : Time.Time;
    status : Status;
    packageWeight : Float;
    packageDescription : Text;
    price : Nat;
  };

  module Booking {
    public type Booking = {
      id : Nat;
      user : Principal;
      bookingType : BookingType;
      time : Time.Time;
      status : Status;
      price : Nat;
    };

    public type BookingType = {
      #ride : {
        pickupLocation : Location;
        dropoffLocation : Location;
        passengers : Nat;
      };
      #drone : {
        pickupLocation : Location;
        dropoffLocation : Location;
        packageWeight : Float;
        packageDescription : Text;
      };
    };

    public func compareByTime(booking1 : Booking, booking2 : Booking) : { #less; #equal; #greater } {
      Int.compare(booking1.time, booking2.time);
    };

    public func compare(booking1 : Booking, booking2 : Booking) : { #less; #equal; #greater } {
      Nat.compare(booking1.id, booking2.id);
    };
  };

  public type Booking = Booking.Booking;
  public type BookingType = Booking.BookingType;

  type NewBooking = {
    bookingType : BookingType;
    time : Time.Time;
    price : Nat;
  };

  type BookingState = {
    bookings : Map.Map<Nat, Booking>;
    nextId : Nat;
  };

  let state = {
    var nextId = 0;
    bookings = Map.empty<Nat, Booking>();
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Internal state helpers
  func getBookingInternal(id : Nat) : Booking {
    switch (state.bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found.") };
      case (?booking) { booking };
    };
  };

  func updateBooking(id : Nat, booking : Booking) {
    state.bookings.add(id, booking);
  };

  // Public Methods
  public shared ({ caller }) func createBooking(newBooking : NewBooking) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create bookings");
    };

    let id = state.nextId;
    let booking : Booking = {
      id;
      user = caller;
      bookingType = newBooking.bookingType;
      time = newBooking.time;
      status = #pending;
      price = newBooking.price;
    };

    updateBooking(id, booking);
    state.nextId += 1;
    id;
  };

  public query ({ caller }) func getBooking(bookingId : Nat) : async ?Booking {
    switch (state.bookings.get(bookingId)) {
      case (null) { null };
      case (?booking) {
        if (booking.user == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?booking;
        } else {
          Runtime.trap("Unauthorized");
        };
      };
    };
  };

  public shared ({ caller }) func cancelBooking(bookingId : Nat) : async () {
    let booking = getBookingInternal(bookingId);

    if (booking.user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Cannot cancel other's booking");
    };

    if (booking.status == #cancelled or booking.status == #completed) {
      Runtime.trap("Booking cannot be cancelled");
    };

    let updatedBooking = { booking with status = #cancelled };
    updateBooking(bookingId, updatedBooking);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    let bookings = state.bookings.values().toList<Booking>();
    bookings.toArray().sort();
  };

  public query ({ caller }) func getUserBookings(p : Principal) : async [Booking] {
    if (p != caller and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the user or admins can view bookings");
    };
    state.bookings.filterMap<Nat, Booking, Booking>(func(_, b) { if (b.user == p) { ?b } else { null } }).values().toArray();
  };

  public query ({ caller }) func getBookingsByStatus(status : Status) : async [Booking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view bookings by status");
    };
    state.bookings.filterMap<Nat, Booking, Booking>(func(_, b) { if (b.status == status) { ?b } else { null } }).values().toArray().sort();
  };

  public query ({ caller }) func getAllBookingsSorted() : async [Booking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    let bookings = state.bookings.values().toList<Booking>();
    bookings.toArray().sort(Booking.compareByTime);
  };
};
