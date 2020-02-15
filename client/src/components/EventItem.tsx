import React, { Component } from "react";

export interface ICreator {
  email: string;
}

export interface IEvent {
  title: string;
  description?: string;
  price: number;
  creator: ICreator;
}

export default class EventItem extends Component<IEvent> {
  render() {
    return (
      <li className="event-item">
        <div className="event-item__header">
          <div className="event-item__header-left">
            <h3 className="event-item__title">{this.props.title}</h3>
            <h4 className="event-item__creator">{this.props.creator.email}</h4>
          </div>
          <div className="event-item__header-right">
            <button className="event-item__book-button">+</button>
          </div>
        </div>
        <p className="event-item__description">{this.props.description}</p>
        <h4 className="event-item__price">{this.props.price}$</h4>
      </li>
    );
  }
}
