import {JetView} from "webix-jet";

import contactList from '../components/contactList'

export default class Contacts extends JetView{
	config(){

		var ui = {
			type:"line", cols:[
				{ type:"clean",
					padding:10, margin:20, borderless:true, body: contactList},
				{ rows:[ { height:10}, 
					{ type:"clean", css:"app-right-panel", padding:4, rows:[
						{ $subview:true } 
					]}
				]}
			]
		};

        return ui
	}

}