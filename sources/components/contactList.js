import {JetView} from "webix-jet";
import {contacts} from "models/records";
import { width } from "window-size";

export default class contactList extends JetView{
	config(){
		return { 
            view:"list", 
            autoConfig:true,
            select: true,
            template: (obj) => {
                let result = '';
                let fullName = obj.LastName && obj.FirstName ? `${obj.FirstName} ${obj.LastName}` : "No name";
                result += `<a route="/top/contacts/contact?id=${obj.id}"> ${fullName} </a>`;
                return result;
            },
            on: {
                onItemClick: function(id){
                    this.show(`/top/contacts/contact/top`)
                    console.log('id here',id)
                }
            },
            maxWidth: 300,
        };
	}
	init(view){
        view.parse(contacts);
        
	}
}