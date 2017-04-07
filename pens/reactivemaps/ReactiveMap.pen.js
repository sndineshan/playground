const {
	ReactiveBase,
	DataSearch,
	SingleList,
	ReactiveMap,
	PlacesSearch,
	AppbaseSensorHelper: helper
} = ReactiveSearch;

class ReactiveMapDefault extends React.Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="row" style={{ margin: "0", maxWidth: "300px", padding: "5px" }}>
			<div className="col s12">
				<div>
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<p style={{ margin: "5px 0", lineHeight: "18px" }}>is going to&nbsp;
					<a href={marker._source.event.event_url} target="_blank">
						{marker._source.event.event_name}
					</a>
				</p>
			</div>
		</div>);
	}
	
	render() {
		return (
			<ReactiveBase
				app="meetup2"
				credentials="qz4ZD8xq1:a0edfc7f-5611-46f6-8fe1-d4db234631f3"
				type="meetup"
				theme="rbc-blue"
			>
				<div className="row reverse-labels">
					<div className="col s6 col-xs-6">
						<ReactiveMap
							appbaseField="location"
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={13}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: ["CitySensor", "VenueSensor"]
							}}
						/>
					</div>
					<div className="col s6 col-xs-6">
						<div>
							<DataSearch
								appbaseField="venue_name_ngrams"
								componentId="VenueSensor"
								placeholder="Search Venue"
								actuate={{
									CitySensor: {
										operation: "must",
										doNotExecute: { true }
									}
								}}
							/>
						</div>
						<div>
							<SingleList
								componentId="CitySensor"
								appbaseField="group.group_city.raw"
								showCount
								size={10}
								title="Input Filter"
								searchPlaceholder="Search City"
								includeSelectAll
							/>
						</div>
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
