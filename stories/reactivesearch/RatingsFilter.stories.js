import React, { Component } from "react";
import { ReactiveBase, RatingsFilter, ResultCard, SelectedFilters } from "@appbaseio/reactivesearch";
import ResponsiveStory from './ResponsiveStory';

export default class RatingsFilterDefault extends Component {
	constructor(props) {
		super(props);
		this.onData = this.onData.bind(this);
	}

	componentDidMount() {
		ResponsiveStory();
	}

	onData(res) {
		const result = {
			image: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
			title: res.name,
			rating: res.rating,
			desc: res.brand,
			url: "#"
		};
		return result;
	}

	render() {
		return (
			<ReactiveBase
				app="car-store"
				credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
			>
				<div className="row">
					<div className="col s6 col-xs-6">
						<SelectedFilters componentId="RatingsSensor" />
						<RatingsFilter
							componentId="RatingsSensor"
							dataField={this.props.mapping.rating}
							title="RatingsFilter"
							data={
							[{ start: 4, end: 5, label: "4 stars and up" },
								{ start: 3, end: 5, label: "3 stars and up" },
								{ start: 2, end: 5, label: "2 stars and up" },
								{ start: 1, end: 5, label: "> 1 stars" }]
							}
							{...this.props}
						/>
					</div>

					<div className="col s6 col-xs-6">
						<ResultCard
							componentId="SearchResult"
							dataField={this.props.mapping.name}
							title="Results"
							from={0}
							size={20}
							onData={this.onData}
							react={{
								and: "RatingsSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

RatingsFilterDefault.defaultProps = {
	mapping: {
		rating: "rating",
		name: "name"
	}
};

RatingsFilterDefault.propTypes = {
	mapping: React.PropTypes.shape({
		rating: React.PropTypes.string,
		name: React.PropTypes.string
	})
};
