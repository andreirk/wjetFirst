import {JetView} from "webix-jet";
import {View as Activities, ACTIVITY_ADD_FORM_WINDOW_ID, ACTIVITY_ADD_FORM_ID, ACTIVITY_EDIT_FORM_ID, ACTIVITY_EDIT_FORM_WINDOW_ID } from './activities';
import  {ModalWindow, activityFormFabric} from '../components/activityWindow'
import  FilesTable from '../components/filesTable'
import {activities,activityTypes,contacts, getData} from "../models/records";

const contactViewTemplate = (obj) => { 
    
    let fullName = obj.LastName && obj.FirstName ? `${obj.FirstName} ${obj.LastName}` : "No name";

    return `
        <div>
            <div>
                <span data_id='${obj.id}' class='webix_icon fa-trash contact_delete'>
                    Delete
                </span>
            </div>
            <div>
                <span data_id='${obj.id}' class='webix_icon fa-pencil contact_edit'>
                    Edit
                </span>
            </div>
        </div>

        <div>"contact page ${fullName} ${obj.Email}" </div>
`
}

export const activitiesFooter = {
    cols:[{gravity:5},{view:'button', value:'Add activity', click: function (obj) {

        $$(ACTIVITY_ADD_FORM_ID).clear()
        $$(ACTIVITY_ADD_FORM_WINDOW_ID).show()

    } }]
}

const contactDetails = {
    view: "tabview",
        cells: [
    {
       id: 'contactActivity',
       header: 'Activities',
        body: {
           rows: [
               Activities,
               activitiesFooter
           ]
        }
    },
    {
        id: 'contactFiles',
        header: 'Files',
        body: FilesTable,

    }
]
}

export default class ContactView extends JetView{
	config(){
		return { type: 'line', rows: [ {id: 'contact', template: contactViewTemplate,
                onClick: {
                    contact_edit:  ( event, two, element) => {
                        const contactID = element.getAttribute("data_id");
                        this.show(`/top/contacts/contact_edit?id=${contactID}`)

                    },
                    contact_delete: ( event, two, element) => {
                        const contactID = element.getAttribute("data_id");
                        contacts.remove(contactID)
                        this.show(`/top/contacts`)

                    }
            }},
            contactDetails,
        ]  };
	}
	init(view, url){
        view.queryView({ id:"contact" }).setValues( getData(1) )

        const editFormConfig = {
            formID : ACTIVITY_EDIT_FORM_ID ,
            typesOptions : activityTypes,
            contactsOptions : contacts
        }

        const editForm = activityFormFabric(editFormConfig)
        const editWindow = webix.ui(new ModalWindow({windowID:ACTIVITY_EDIT_FORM_WINDOW_ID, headName:'Edit', form:editForm}))
        $$(ACTIVITY_EDIT_FORM_ID).bind(activities);



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

    }
    urlChange(view, url){
        if(url[0].params.id){
            const id = url[0].params.id;
            view.queryView({ id:"contact" }).setValues( getData(id) )
            const table = view.queryView({ id:"mydata" })
            const contactActivity = activities.getItem(id)
            table.parse( activities );
            table.filter('#ContactID#', id)


        } else {
            // todo
            // this.app.show("./contact?id=1")
            // view.queryView({ id:"contact" }).setValues( getData(1) )
        }
        
    }
}