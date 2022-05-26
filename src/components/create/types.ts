export interface CreateFormValues {
	type: number;
	title: string;
	brief?: string;
	target: string;
	effectDay?: string;
	departureAmount?: string;
	deadline: moment.Moment;
}
