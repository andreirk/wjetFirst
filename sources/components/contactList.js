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
                const fullName = obj.LastName && obj.FirstName ? `${obj.FirstName} ${obj.LastName}` : "No name";
                const result = `${fullName}`;
                return result;
            },
            on: {
                onItemClick: (id) => {
                    this.show(`/top/contacts/contact?id=${id}`)
                }
            },
            maxWidth: 300,
        };
	}
	init(view){
        view.parse(contacts);
        
	}
}