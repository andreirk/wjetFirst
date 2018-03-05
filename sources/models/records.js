
const contactUrl = '/api/v1/contacts/';
const activitytUrl = '/api/v1/activities/';
const activitiesTypestUrl = '/api/v1/activitytypes/';
const statusesUrl = '/api/v1/statuses/';



export const data = new webix.DataCollection({ data:[
	{ id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1},
	{ id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2},
	{ id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3},
	{ id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4},
	{ id:5, title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5},
	{ id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6}
]});

export const contacts = new webix.DataCollection({ 
	url: contactUrl
});

export const activities = new webix.DataCollection({ 
	url: activitytUrl
});

export const activityType = new webix.DataCollection({ 
	url: activitiesTypestUrl
});

export const status = new webix.DataCollection({ 
	url: statusesUrl
});



export const getData = (id) => {
	return contacts.getItem(id);
}

export const getActivity = (id) => {
	return activities.getItem(id);
}
export const getActivites = (id) => {
	return activities.getItems();
}

export const getActivityType = (id) => {
	return activities.getItem(id);
}