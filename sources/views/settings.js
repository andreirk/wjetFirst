import {activities, getContactTypes,activityTypes,status } from "../models/records";



export default {
	view:"tabview",
	cells:[
		{
			header:"Language",
			body:{
				height: '900',
				view:"form", elements: [{ cells: [
					{
						view: "radio",
						id: "webix_control",
						options: [
							{
								id: "Rus",
								value: "Rus"
							},
							{
								id: "Eng",
								value: "Eng"
							}
						],

						label: "Language",
						labelPosition: "top",
						labelAlign: "left"
					}
				]}]
			}
		},
		{
			header:"Activity Types",
			body:{
				rows:[
					{ cols: [
						{gravity: 4},
						{
							view: 'button',
							value: 'Add Activity Type',
							click: function () {
								const modalWindow = {
									view: 'window',
									id: 'activityTypeWindow',
									modal: true,
									position :  "center",
									body: {
										view:"form",
										id: 'activityTypeForm',
										elements:[
											{ view:"text", label:"Value", name:'Value' },
											{ view:"text", name:"Icon", label:"Icon" },

											{cols:[
												{ view:"button", value:"Save", click: function () {
													const values = $$('activityTypeForm').getValues()
													activityTypes.add(values)
													$$('activityTypeWindow').close()
												} },
												{ view:"button", value:"Cancel", click: function () {
													$$('activityTypeWindow').close()
												} }
											]}
										]
									}
								}
								webix.ui(modalWindow).show()
							}
						}
					]


					},
					{
						editable: true,
						view: 'datatable',
						data: activityTypes,
						autoConfig: true
					}
					],

			}
		},
		{
			header:"Contact Statuses",
			body:{
				editable: true,
				view: 'datatable',
				data: status,
				autoConfig: true
			}
		}
	]
}