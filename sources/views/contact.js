import {JetView} from "webix-jet";
import {data, getData} from "../models/records";

const contactViewTemplate = (obj) => { 
    
    let fullName = obj.LastName && obj.FirstName ? `${obj.FirstName} ${obj.LastName}` : "No name";

    return `
        <div>
            <div>
                <span class='webix_icon fa-trash'>    
                    Delete
                </span>
            </div>
            <div>
                <span class='webix_icon fa-pencil'>Edit</span>
            </div>
        </div>

        " contact page ${fullName} ${obj.Email}"
`
}

export default class ContactView extends JetView{
	config(){
		return { template: contactViewTemplate,  };
	}
	init(view, url){
        console.log(url);
        this.show("/top/contacts/contact?id=1")
        view.setValues( getData(1) )
        // 
    }
    urlChange(view, url){
        if(url[0].params.id){
            const id = url[0].params.id;
            console.log('url change', url)
            console.log('root ', this.getRoot(), getData(id) )
            this.getRoot().setValues( getData(id) )
            
        } else {
            this.show("./contact?id=1")
        }
        
    }
}