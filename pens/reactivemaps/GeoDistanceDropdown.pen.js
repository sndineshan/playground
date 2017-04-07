const {
	ReactiveBase,
	ReactiveMap,
	GeoDistanceDropdown,
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
				app="reactivemap_demo"
				credentials="y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18"
				type="meetupdata1"
				theme="rbc-blue"
			>
				<div className="row">

					<div className="col s6 col-xs-6">
						<GeoDistanceDropdown
							componentId="GeoDistanceDropdown"
							appbaseField="location"
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
								and: "GeoDistanceDropdown"
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
