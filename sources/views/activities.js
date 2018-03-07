import {JetView} from "webix-jet";

import modalWindow, {ModalWindow, activityForm, activityFormFabric} from '../components/activityWindow'
import {activities, getActivites, getActivityTypes, getContactTypes } from "../models/records";


const ACTIVITY_FORM_WINDOW_ID = 'ACTIVITY_FORM_WINDOW';
const ACTIVITY_FORM_ID = 'ACTIVITY_FORM'

const View =   {
    view:"datatable",
    // autoConfig: true,
    id: 'mydata',
  
    columns:[
        { id:"TypeID",    header:"TypeID",    },
        { id:"DueDate",   header: ["DueDate Title", {content:"dateFilter"}, ], editor:'date',},
        { id:"Details",    header: ["Details", {content:"textFilter"}, ], editor:'text',},
		{ id:"ContactID",   header: ["ContactID", {content:"textFilter"}, ], editor:'text',  },
		{ id: "edit",  template:function(obj, common){
            return `<span data='${obj.id}' name='edit' class='edit_button webixtype_form'> Edit </span>`;
      	 }}, 
		{ id: "trash",  template:function(obj, common){
            return `<span data='${obj.id}' name='del' class='del_button webixtype_form'> Del </span>`;
      	 }}, 
    ],
    // editable: true,

    rules: {
        "votes": webix.rules.isNumber
    },
	customDataStore: {
		activityTypes: getActivityTypes(),
		contactTypes: getContactTypes(),
    },
    onClick:{
        edit_button:function(ev, id){
			// TODO	is it right way to get value
			const _this = this;
			const itemID = ev.target.attributes.data.value
			console.log('value', itemID);
            const toFillForm = this.data.getItem(itemID)
			console.log('edit here I am!!!!!!!!!!!!!!!!!!!!!!!', {ev, id, data:this.data.pull, dataFromTarget: itemID, currentData:this.data.getItem(itemID)});
            console.log('costom', this.config.customDataStore)


            const editFunction = (obj) => {
                const values = $$(ACTIVITY_FORM_ID).getValues();
                activities.updateItem(itemID, values);
                $$(ACTIVITY_FORM_WINDOW_ID).close();

            };
            const typesOptions =  _this.config.customDataStore.activityTypes;
            const contactsOptions =  _this.config.customDataStore.contactTypes;

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
		const activityTable = $$('mydata');
        const typesOptions =  activityTable.config.customDataStore.activityTypes;
        const contactsOptions =  activityTable.config.customDataStore.contactTypes;

		const cancelFunction = () => { $$(ACTIVITY_FORM_WINDOW_ID).close() }

		const formConfig = {
			formID : ACTIVITY_FORM_ID ,
			onHandleClickOk: addFunction,
			onHandleClickCancel: cancelFunction,
			typesOptions,
			contactsOptions}
		const addForm = activityFormFabric(formConfig)

		const myWindow = webix.ui(new ModalWindow({windowID:ACTIVITY_FORM_WINDOW_ID,headName:'Add', form:addForm}))
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

