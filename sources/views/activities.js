import {JetView} from "webix-jet";

import modalWindow, {ModalWindow, activityForm, activityFormFabric} from '../components/activityWindow'
import {activities, getActivites, getActivityTypes, getContactTypes,activityTypes,contacts } from "../models/records";


const ACTIVITY_FORM_WINDOW_ID = 'ACTIVITY_FORM_WINDOW';
const ACTIVITY_FORM_ID = 'ACTIVITY_FORM'

const View =   {
    view:"datatable",
    id: 'mydata',
  
    columns:[
		{id: 'complited', header:'Complited', template:"{common.checkbox()}"},
        { id:"TypeID",    header:["Type", {content:"selectFilter"}] , collection: activityTypes  },
        { id:"DueDate",   header: ["DueDate Title", {content:"dateFilter"}, ], editor:'date',},
        { id:"Details",    header: ["Details", {content:"textFilter"}, ], editor:'text',},
		{ id:"ContactID",   header: ["Contact", {content:"selectFilter"}, ], collection:contacts, editor:'text',  },
		{ id: "edit", header:'', template:function(obj, common){
            return `<span data='${obj.id}' name='edit' class='edit_button webixtype_form'> Edit </span>`;
      	 }}, 
		{ id: "trash", header:'', template:function(obj, common){
            return `<span data='${obj.id}' name='del' class='del_button webixtype_form'> Del </span>`;
      	 }}, 
    ],

    rules: {
        "votes": webix.rules.isNumber
    },
	customDataStore: {
		activityTypes: getContactTypes(),
		contactTypes: getContactTypes(),
    },
    onClick:{
        edit_button:function(ev, id, third){
			// TODO	is it right way to get value
			const _this = this;
			console.log('thierd i id', {id, third, ev})
			const itemID = ev.target.attributes.data.value
            const toFillForm = this.data.getItem(itemID)

            const editFunction = (obj) => {
                const values = $$(ACTIVITY_FORM_ID).getValues();
                activities.updateItem(itemID, values);
                $$(ACTIVITY_FORM_WINDOW_ID).close();

            };
            const typesOptions = activityTypes;
            const contactsOptions = contacts;

            const cancelFunction = () => { $$(ACTIVITY_FORM_WINDOW_ID).close() }

            const formConfig = {
                formID : ACTIVITY_FORM_ID ,
                onHandleClickOk: editFunction,
                onHandleClickCancel: cancelFunction,
                typesOptions,
                contactsOptions}

            const editForm = activityFormFabric(formConfig)

            const myWindow = webix.ui(new ModalWindow({windowID:ACTIVITY_FORM_WINDOW_ID, headName:'Edit', form:editForm}))
            $$(ACTIVITY_FORM_ID).setValues(toFillForm)
            myWindow.show()
		
        },
        del_button:function(ev, row){
						
			var itemID = ev.target.attributes.data.value
            webix.modalbox({
                title:"It cannot be undone!",
                buttons:["Yes", "No"],
                width:500,
                text:"Are you sure?",
                callback:function(result){
                    switch(result){
                        case "0":
                            activities.remove(itemID)
                            break;
                        case "1":
                            break;
                    }
                }
            });

        },
    }

};

const activitiesHeader = {
	cols:[{gravity:5},{view:'button', value:'Add activity', click: function (obj) {
		const addFunction = (obj) => {
            const values = $$(ACTIVITY_FORM_ID).getValues();
            activities.add(values);
            $$(ACTIVITY_FORM_WINDOW_ID).close();
        };

        const typesOptions =  activityTypes;
        const contactsOptions =  contacts;

		const cancelFunction = () => { $$(ACTIVITY_FORM_WINDOW_ID).close() }

		const formConfig = {
			formID : ACTIVITY_FORM_ID ,
			onHandleClickOk: addFunction,
			onHandleClickCancel: cancelFunction,
			typesOptions,
			contactsOptions
		}
		const addForm = activityFormFabric(formConfig)

		const myWindow =  webix.ui(new ModalWindow({windowID:ACTIVITY_FORM_WINDOW_ID,headName:'Add', form:addForm}))
		myWindow.show()

	} }]
}

export default class ActivitiesView extends JetView{
	config(){
		return {rows:[activitiesHeader,View, ]};
	}
	init(view, url){
		console.log(url);
		view.queryView({ view:"datatable" }).parse(activities);
    }
    urlChange(view, url){
        
    }
}

