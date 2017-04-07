const {
	ReactiveBase,
	DataController,
	ReactiveMap,
	AppbaseSensorHelper: helper
} = ReactiveSearch;

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
		this.customQuery = this.customQuery.bind(this);
	}

	componentDidMount() {
		helper.ResponsiveStory();
	}

	customQuery(value) {
		return {
			query: {
				match_all: {}
			}
		};
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
				app="reactivemap-demo"
				credentials="qMzzgez0t:a9138c3f-f246-4cd8-ba3d-0b99f9550c05"
				type="meetupdata1"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<DataController
							componentId="CustomSensor"
							appbaseField="mtime"
							customQuery={this.customQuery}
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
								and: "CustomSensor"
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
