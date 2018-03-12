import {JetView} from "webix-jet";
import {contacts} from "models/records";
import { width } from "window-size";


const contactListConfig = {
    view:"list",
    id: 'contactList',
    autoConfig:true,
    select: true,
    template: (obj) => {
        const fullName = obj.LastName && obj.FirstName ? `${obj.FirstName} ${obj.LastName}` : "No name";
        const result = `${fullName}`;
        return result;
    },

    maxWidth: 300,
}

export default class contactList extends JetView{
	config(){
		return { 
            rows: [
                contactListConfig,
                {
                    view: "button",
                    value: 'Add contact',
                    click:  () => {
                        // this.app.show(`/top/contacts/contact?id=${null}`)
                        this.show(`/top/contacts/contact_edit?id=${null}`)

                    }
                }
            ]
        };
	}
	init(view){
        const _this = this;
        const contactList = view.queryView({id: 'contactList'})
        contactList.parse(contacts);
        contactList.attachEvent("onItemClick", function(id, e, node){
            _this.app.show(`/top/contacts/contact?id=${id}`)

        });
        
	}
}