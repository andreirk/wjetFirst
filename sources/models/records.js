
const contactUrl = '/api/v1/contacts/';
const activitytUrl = '/api/v1/activities/';
const activitiesTypestUrl = '/api/v1/activitytypes/';
const statusesUrl = '/api/v1/statuses/';


export const contacts = new webix.DataCollection({ 
	url: contactUrl
});

export const activities = new webix.DataCollection({ 
	url: activitytUrl
});

export const activityTypes = new webix.DataCollection({
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
export const getActivites = () => {
	return activities.getItems();
}

export const getActivityType = (id) => {
	return activityTypes.getItem(id);
}

export function getActivityTypes() {
    // return activityTypes.data.serialize()
	return ['Type 1', 'Type 2']
}
export function getContactTypes() {
    // return contacts.data.serialize()
	return ['contact 1', 'contact 2']
}
