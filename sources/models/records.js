
export const contactUrl = '/api/v1/contacts/';
export const activitytUrl = '/api/v1/activities/';
export const activitiesTypestUrl = '/api/v1/activitytypes/';
export const statusesUrl = '/api/v1/statuses/';


export const contacts = new webix.DataCollection({ 
	url: contactUrl,
    scheme: {
        $init:function(obj){
            obj.value = obj.FirstName ? obj.FirstName : obj.Email;
        }
    }

});

export const activities = new webix.DataCollection({ 
	url: activitytUrl,
    scheme: {
        $init:function(obj){
            obj.complited = obj.State === 'Open'
        }
    }
});

export const activityTypes = new webix.DataCollection({
	url: activitiesTypestUrl,
    scheme: {
        $init:function(obj){
             obj.value = obj.Value;
        }
    }
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
	// TODO
    // return activityTypes.data.serialize()
	return ['Type 1', 'Type 2']
}
export function getContactTypes() {
    // TODO
    // return contacts.data.serialize()
	return ['contact 1', 'contact 2']
}
