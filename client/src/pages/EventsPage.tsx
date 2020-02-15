import React, { Component } from "react";
import { EventsList } from "../components/EventsList";

export default class EventsPage extends Component {
  render() {
    return (
      <div>
        <h1>Explore Events</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minima
          officiis quos alias eos quas nostrum atque. Et placeat delectus nobis,
          dignissimos eligendi minus quibusdam, asperiores numquam perspiciatis
          velit commodi dolorum eum inventore, libero repellat officiis itaque
          magnam aspernatur!
        </p>
        <EventsList />
      </div>
    );
  }
}
