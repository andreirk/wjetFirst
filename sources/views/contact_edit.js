import {JetView} from "webix-jet";
import {contacts, getData} from "../models/records";


export default class ContactEditForm extends JetView{
    config(){
        return {
            view:"form",
            id: 'contactEditForm',
            height:900,
            elements:[
                { view:"text", label:"Email"    ,name:"Email"        },
                { view:"text", label:"Address"  ,name:"Address"      },
                { view:"text", label:"Company"  ,name:"Company"      },
                { view:"text", label:"FirstName",name:"FirstName"    },
                { view:"text", label:"LastName" ,name:"LastName"     },
                { view:"text", label:"Birthday" ,name:"Birthday"     },
                { view:"text", label:"Job"      ,name:"Job"          },
                { view:"text", label:"Phone"    ,name:"Phone"        },
                { view:"text", label:"Skype"    ,name:"Skype"        },
                { view:"text", label:"StartDate",name:"StartDate"    },
                { view:"text", label:"StatusID" ,name:"StatusID"     },
                { view:"text", label:"Website"  ,name:"Website"      },
                {cols:[
                    { view:"button", value:"Save", type:"form",
                    on: {
                        onItemClick: () => {
                            const values = $$('contactEditForm').getValues();
                            if(this._id){
                                contacts.updateItem(this._id, values);
                                this.show(this.show(`/top/contacts/contact?id=${this._id}`))
                            } else {
                                contacts.add(values)
                                this.show(this.show(`/top/contacts/contact`))
                            }

                        }
                    }
                    },
                    { view:"button", value:"Cancel" ,
                        on: {
                            onItemClick: () => {
                                if(this._id){
                                    this.show(this.show(`/top/contacts/contact?id=${this._id}`))
                                } else {
                                    this.show(this.show(`/top/contacts/contact`))
                                }
                            }
                    }}
                ]}
            ]
        }
    }

    init(){
        this._id = null;
    }

    urlChange(view, url){
        const id = url[0].params.id;
        if(id != 'null') {
            this._id = id;
            view.setValues(getData(id))
        }
    }
}

