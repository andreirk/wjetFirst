import {JetView} from "webix-jet";
import * as moment from 'moment';
import  {ModalWindow, activityFormFabric} from '../components/activityWindow'
import {activities, getContactTypes,activityTypes,contacts } from "../models/records";


export const ACTIVITY_ADD_FORM_WINDOW_ID = 'ACTIVITY_ADD_FORM_WINDOW';
export const ACTIVITY_EDIT_FORM_WINDOW_ID = 'ACTIVITY_EDIT_FORM_WINDOW';

export const ACTIVITY_EDIT_FORM_ID = 'ACTIVITY_EDIT_FORM'
export const ACTIVITY_ADD_FORM_ID = 'ACTIVITY_ADD_FORM'


export const View =   {
    view:"datatable",
    id: 'mydata',
  
    columns:[
		{ id:'completed', header:'Completed', template:"{common.checkbox()}"},
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
        edit_button:function(ev, id){
            activities.setCursor(id);
            $$(ACTIVITY_EDIT_FORM_WINDOW_ID).show()
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

export const filterTabs = {
		gravity:4,
		view:"segmented",
		id:"segFilter",
		options:[
			{id:"all", value:"All"},
			{id:"completed", value:"Completed"},
			{id:"today", value:"Today"},
			{id:"overdue", value:"Overdue"},
			{id:"tomorrow", value:"Tomorrow"},
			{id:"this_week", value:"This week"},
			{id:"this_month", value:"This month"}
		],
		on:{
			onChange: function(currentVal, prevVal){
				const table = $$("mydata");
				switch (currentVal){
					case 'all':
						table.filter();
						break;
					case 'completed':
						table.filter((obj) => {
							return obj.completed === true;
						});
						break;
					case 'today':
						table.filter((obj) => {
							return obj.DueDate === moment().format('DD-MM-YYYY');
						});
						break;
					case 'overdue':
						break;
					case 'tomorrow':
						break;
					case 'this_week':
						break;
					case 'this_month':
						break;

				}

			}
		}
	};

export const activitiesHeader = {
	cols:[
		{
			gravity:4,
		},
		{
			view:'button',
			value:'Add activity',
			click: function (obj) {
				$$(ACTIVITY_ADD_FORM_ID).clear()
				$$(ACTIVITY_ADD_FORM_WINDOW_ID).show()
			}
		}]
}

export default class ActivitiesView extends JetView{
	config(){
		return {rows:[
            activitiesHeader,
			filterTabs,
            View,
        ]};
	}
	init(view, url){

		// edit form init
        const editFormConfig = {
			formID : ACTIVITY_EDIT_FORM_ID ,
            typesOptions : activityTypes,
            contactsOptions : contacts
        }

        const editForm = activityFormFabric(editFormConfig)
        const editWindow = webix.ui(new ModalWindow({windowID:ACTIVITY_EDIT_FORM_WINDOW_ID, headName:'Edit', form:editForm}))
        $$(ACTIVITY_EDIT_FORM_ID).bind(activities);

        // add form init
        const addFunction = (obj) => {
            const values = $$(ACTIVITY_ADD_FORM_ID).getValues();
            activities.add(values);
            $$(ACTIVITY_ADD_FORM_WINDOW_ID).hide();
        };

        const cancelFunction = () => { $$(ACTIVITY_ADD_FORM_WINDOW_ID).hide() }

        const addFormConfig = {
            formID : ACTIVITY_ADD_FORM_ID ,
            onHandleClickOk: addFunction,
            onHandleClickCancel: cancelFunction,
            typesOptions : activityTypes,
            contactsOptions :  contacts
        }
        const addForm = activityFormFabric(addFormConfig)

        const addWindow =  webix.ui(new ModalWindow({windowID:ACTIVITY_ADD_FORM_WINDOW_ID,headName:'Add', form:addForm}))

		view.queryView({ view:"datatable" }).parse(activities);

    }
    urlChange(view, url){
        
    }
}

