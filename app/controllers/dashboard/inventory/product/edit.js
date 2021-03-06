import Ember from 'ember';

export default Ember.Controller.extend({

addtostock:0,

isAddToStockButtonDisabled: Ember.computed('addtostock' ,  function() {
  if( Ember.isEmpty(this.get('addtostock'))
){return 'disabled';}
else{return '';}
}),


    //
    // retailprice: function() {
    //   var initialcostprice = this.get('product.initialcostprice');
    //   var buyprice = this.get('product.buyprice');
    //   var retailprice = (parseFloat(initialcostprice) + parseFloat(buyprice)) / 2 ;
    //   return Math.round(retailprice);
    // }.property('product.initialcostprice', 'product.buyprice'),




    actions:{


addToStock:function(product){
  var controller = this;
  let initialstocklevel  = product.get('initialstocklevel');

  let addtostock = controller.get('addtostock');
  if(addtostock){


  let addedvalue = parseInt(initialstocklevel) + parseInt(addtostock);

  product.set('initialstocklevel',addedvalue);

  product.save().then(function(){
    controller.notifications.addNotification({
      message: 'Stock updated!' ,
      type: 'success',
      autoClear: true
    });

    Ember.$('.ui.addtoinventory.small.modal')
    .modal('hide')
    ;
  }).catch(function(){
    controller.notifications.addNotification({
      message: 'Sorry, cant save at the moment !' ,
      type: 'error',
      autoClear: true
    });
  });

  }


},


openAddInventorymodal:function(){
  Ember.$('.ui.addtoinventory.small.modal')
  .modal('show')
  ;
},

      deleteProduct:function(product){

        var controller= this;

        var confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
        product.destroyRecord().then(function () {
          controller.notifications.addNotification({
            message: 'Product Deleted!' ,
            type: 'success',
            autoClear: true
          });

          controller.transitionToRoute('dashboard.inventory.index');

        }).catch(function () {
          product.rollbackAttributes();
          controller.notifications.addNotification({
            message: 'Product cannot be deleted. It may be used in Purchase Order or New Orders' ,
            type: 'error',
            autoClear: true
          });
        });

      }

      },
      saveProduct:function(){
        var controller = this;
        // this.set('product.retailprice' , this.get('retailprice'));
        var currentProduct = this.get('product');


        currentProduct.save().then(function(){
          controller.notifications.addNotification({
            message: 'Product Saved!' ,
            type: 'success',
            autoClear: true
          });
        }).catch(function(){
          controller.notifications.addNotification({
            message: 'Sorry, cant save at the moment !' ,
            type: 'error',
            autoClear: true
          });
        });


      }
    }

});
