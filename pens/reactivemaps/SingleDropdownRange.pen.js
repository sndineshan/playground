const {
	ReactiveBase,
	SingleDropdownRange,
	ReactiveMap,
	AppbaseSensorHelper: helper
} = ReactiveSearch;

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="row">
			<div className="col s12">
				<p>
					Earthquake (at)&nbsp;
					<strong>{marker._source.place}</strong>&nbsp;
					of maginutde: <code>{marker._source.mag}</code>&nbsp;
					in the year {marker._source.time}.
				</p>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="earthquake"
				credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<SingleDropdownRange
							componentId="EarthquakeSensor"
							appbaseField="mag"
							title="SingleDropdownRange"
							data={
							[{ start: 3, end: 3.9, label: "Minor" },
								{ start: 4, end: 4.9, label: "Light" },
								{ start: 5, end: 5.9, label: "Moderate" },
								{ start: 6, end: 6.9, label: "Strong" },
								{ start: 7, end: 7.9, label: "Major" },
								{ start: 8, end: 10, label: "Great" }]
							}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ReactiveMap
							appbaseField="location"
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							title="Reactive Maps"
							showPopoverOn="click"
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: ["EarthquakeSensor"]
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

ReactDOM.render(
	<Main></Main>,
	document.getElementById("root")
);
