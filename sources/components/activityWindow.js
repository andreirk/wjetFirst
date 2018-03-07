
export const activityForm = {
    view:"form", 
    id:"activityForm",
    width:300,
    elements:[
        { view:"textarea", label:"Details", name:"Details"},
        { view:"select", label:"Type", name:"TypeID", options: ['1','2', '3']},
        { view:"select", label:"Contact", name:"ContactID", options: ['1','2', '3']},
        { view:"datepicker", label:"Date", name:"DueDate"},
        { view:"datepicker", type: "time", label:"Time", name:"time"},
        { view:"checkbox", label:"Complited", name:"complited"},
        { margin:5, cols:[
            { view:"button", value:"Add(*save)" , type:"form", click: function(obj){
                const values = $$("activityForm").getValues()
                console.log(obj, values);
            }},
            { view:"button", value:"Cancel", click: function(){ $$("my_window").close() }}
        ]}
    ]
}


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
                { view:"button", value:"Add(*save)" , type:"form", click: onHandleClickOk },
                { view:"button", value:"Cancel", click: onHandleClickCancel }
            ]}
        ]
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

const modalWindow = {
    view: "window",
    id:"my_window",
    head:"Add (*edit) activity",
    height:450,
    modal: true,
    width:500,
    position: "center",
    left:250, top:250,
    body:activityForm
}

export default modalWindow;