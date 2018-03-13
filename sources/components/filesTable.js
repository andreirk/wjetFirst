import {JetView} from "webix-jet";
import {files} from "../models/records"


const filesDataTableConfig = {
    columns:[
        { id:"name",    header:"Name",   width:350, },
        { id:"change_date",    header: "Released", width:200},
        { id:"size",   header: "Size",  width:100},
        { id:"trash",   header: "", width:50, template:function(obj, common){
            return "<span  class='webix_icon fa-trash remove_button'>'";
        }},
    ],
    onClick:{
      remove_button: function (event, item) {
          console.log({event, item})
          webix.modalbox({
              title:"It cannot be undone!",
              buttons:["Yes", "No"],
              width:500,
              text:"Remove that file?",
              callback:function(result){
                  switch(result){
                      case "0":
                          files.remove(item.row)
                          break;
                      case "1":
                          break;
                  }
              }
          });
      }
    },
    view: 'datatable',
    id: 'filesTable',
    type: 'uploader',
}



export default class FilesTableView extends JetView {
    config() {
        return {
            view:"form", rows: [
                filesDataTableConfig,
                {
                    view: "uploader", value: 'Upload file',
                    id:"records", name:"records",
                    link:"filesTable",  upload:"php/upload.php"
                },

            ]
        }
    }

    init(){
        $$("records").files.parse(files);
    }
}