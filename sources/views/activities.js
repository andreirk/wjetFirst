import {JetView} from "webix-jet";
let JSONUrl = '/api/v1/activities/';
import {activities, getActivites} from "../models/records";

const View =   {
    view:"datatable",
    // autoConfig: true,
    id: 'mydata',
  
    columns:[
        { id:"TypeID",    header:"TypeID",    },
        { id:"DueDate",   header: ["DueDate Title", {content:"textFilter"}, ], editor:'date',},
        { id:"Details",    header: ["Details", {content:"textFilter"}, ], editor:'text',},
		{ id:"ContactID",   header: ["ContactID", {content:"textFilter"}, ], editor:'text',  },
		{ id: "edit",  template:function(obj, common){
            return `<span data='${obj.id}' name='edit' class='details_button webixtype_form'> Edit </span>`;
      	 }}, 
		{ id: "trash",  template:function(obj, common){
            return `<span data='${obj.id}' name='del' class='details_button webixtype_form'> Del </span>`;
      	 }}, 
    ],
    editable: true,

    rules: {
        "votes": webix.rules.isNumber
    },
    onClick:{
        details_button:function(ev, id){
			//will be called on button click
			
			var data = ev.target.attributes.data.value
            console.log('here I am!!!!!!!!!!!!!!!!!!!!!!!!!!', {ev, id, data:this.data.pull, dataFromTarget: data});
        },
    }
    // data: small_film_set
};


export default class ActivitiesView extends JetView{
	config(){
		return View;
	}
	init(view, url){
        console.log(url);
         view.parse(activities)
        // 
    }
    urlChange(view, url){

        
    }
}