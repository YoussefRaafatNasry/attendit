import React, { Component } from "react";
import EventItem, { IEvent } from "./EventItem";

interface IState {
  events: IEvent[];
}

export class EventsList extends Component<{}, IState> {
  public state: IState = {
    events: [1, 2, 3, 4, 5, 6].map(n => ({
      title: `Event ${n}`,
      price: 9,
      creator: { email: "test@lol.com" },
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit cum fugit odit quia! Molestiae consectetur distinctio corporis
                    accusamus voluptate facere, cumque tempora harum nisi placeat veniam.
                    Laborum praesentium dolores doloribus!`
    }))
  };

  render() {
    return (
      <ul className="events__list">
        {this.state.events.map(e => (
          <EventItem
            title={e.title}
            description={e.description}
            creator={e.creator}
            price={e.price}
          />
        ))}
      </ul>
    );
  }
}
