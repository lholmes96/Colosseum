sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("todolist.todolist.controller.main", {
        onInit: function () {
            var oInitialValues= {
                addInput: ''
            };
            var oModel = new JSONModel(oInitialValues);
            this.getView().setModel(oModel, "localValueModel");

            var oTaskData = {
                Tasks: [
                    {
                        id: '1',
                        title: 'First task',
                        description: 'Test me',
                        duedate: '2024-09-08',
                        status: true
                    },
                    {
                        id: '2',
                        title: 'Second task',
                        description: 'Test me',
                        duedate: '2024-12-25',
                        status: false
                    }
                ]
            };
            var oTaskModel = new JSONModel(oTaskData);
            this.getView().setModel(oTaskModel, "TaskModel");
        },

        onItemAdd: function () {
            
            if (!this.pDialog){
               this.pDialog = this.loadFragment({
                name: "todolist.todolist.fragments.createItemDialog"
               });
            }

            this.pDialog.then(function(oDialog){
                var oNewItemModel = new JSONModel();
                oDialog.setModel(oNewItemModel, "dialogModel");
                oDialog.open();
            });

            this.getView().getModel().submitBatch("taskGroup");
        },

        onCreateItemCancel: function(oEvent){
            this.pDialog.then(function(oDialog){
                oDialog.close();
            });
        },

        onItemCreate: function(){
            this.pDialog.then(function(oDialog){
                const oNewItemModel = oDialog.getModel("dialogModel");
                const oList =this.getView().byId("mainList");
                const oBinding = oList.getBinding("items");
                oBinding.create(oNewItemModel.getData());

                this.getView().getModel().submitBatch("taskGroup");

                oDialog.close();
            }.bind(this));
        },

        onItemDelete: function(oEvent){
            var oSelected = this.byId("mainList").getSelectedItem();

            if(oSelected){
                var oContext = oSelected.getBindingContext();
                oContext.delete();
            }
        },

        onUpdateItem: async function(oEvent){
            if(!this.editTaskDialog){
                this.editTaskDialog = this.loadFragment({name: "todolist.todolist.fragments.updateItemDialog"});
            }

            const oList = this.byId("mainList");
            const oItemList = oList.getSelectedItem("mainList");
            const oItemData = oItemList.getBindingContext().getObject();

            this.editTaskDialog.then(function(oDialog){
                var oNewItemModel = new JSONModel(oItemData);
                oDialog.setModel(oNewItemModel, "updateModel")
                oDialog.open();
            });
        },

        onCancelUpdate: function(oEvent){
            this.editTaskDialog.then(function(oDialog){
                oDialog.close();
            });
        },

        onUpdate: function(oEvent){
            this.editTaskDialog.then(function(oDialog){

                var oSelected = this.byId("mainList").getSelectedItem();

                if(oSelected){
                    const oContext = oSelected.getBindingContext();
                    oContext.delete();
                }

                const oNewItemModel = oDialog.getModel("updateModel");
                const oList =this.getView().byId("mainList");
                const oBinding = oList.getBinding("items");
                oBinding.create(oNewItemModel.getData());

                this.getView().getModel().submitBatch("taskGroup");

                oDialog.close();
            });
        },

    });
});
