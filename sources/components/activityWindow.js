

export function activityFormFabric({formID, onHandleClickOk, onHandleClickCancel, typesOptions, contactsOptions}) {
    return {
        view:"form",
        id: formID,
        width:300,
        elements:[
            { view:"textarea", label:"Details", name:"Details"},
            { view:"select", label:"Type", name:"TypeID", options: typesOptions},
            { view:"select", label:"Contact", name:"ContactID", options: contactsOptions},
            { view:"datepicker", label:"Date", name:"DueDate"},
            { view:"datepicker", type: "time", label:"Time", name:"time"},
            { view:"checkbox", label:"Complited", name:"complited"},
            { margin:5, cols:[
                { view:"button", value:"Add(*save)" , type:"form",
                    click: onHandleClickOk ? onHandleClickOk : function () {
                        const thisForm = this.getFormView()
                        thisForm.save()
                        const parentWindow  = thisForm.getParentView()
                        parentWindow.hide()
                    }
                },
                { view:"button", value:"Cancel",
                     click: onHandleClickCancel ? onHandleClickCancel : function () {
                         const thisForm = this.getFormView()
                         const parentWindow  = thisForm.getParentView()
                         parentWindow.hide()
                     }
                }
            ]}
        ],

    }
}

export class ModalWindow {
    constructor({windowID, headName, form}){
        this.view = "window";
        this.id = windowID;
        this.head = headName; 
        this.height = 400;
        this.modal =  true;
        this.width = 600;
        this.position =  "center";
        this.left = 250; 
        this.top = 250;
        this.body = form;
    }
}



