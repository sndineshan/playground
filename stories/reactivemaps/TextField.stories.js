import React, { Component } from "react";
import {
	ReactiveBase,
	TextField,
	ReactiveMap,
	SelectedFilters
} from "@appbaseio/reactivemaps";
import ResponsiveStory from '../reactivesearch/ResponsiveStory';

import { Img } from "./Img.js";
const historyPin = require("./placeholder.svg");

export default class TextFieldMapDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row" style={{ margin: "0", maxWidth: "300px" }}>
			<span className="imgContainer col s2" style={{ padding: "0" }}>
				<Img src={marker._source.member.photo} />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p style={{ margin: "5px 0", lineHeight: "18px" }}>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="reactivemap-demo"
				credentials="qMzzgez0t:a9138c3f-f246-4cd8-ba3d-0b99f9550c05"
				type="meetupdata1"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<SelectedFilters componentId="VenueSensor" />
						<TextField
							dataField={this.props.mapping.city}
							componentId="VenueSensor"
							placeholder="Search Venue"
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ReactiveMap
							dataField={this.props.mapping.location}
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							title="Reactive Maps"
							showPopoverOn="click"
							historicPin={historyPin}
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: "VenueSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

TextFieldMapDefault.defaultProps = {
	mapping: {
		city: "group.group_city.raw",
		location: "location"
	}
};
