/* global angular, document, window */
'use strict';

angular.module('starter.services', [])
.factory("islemler",function($rootScope,$state,$http,$localStorage){
  return{
    girisKontrol:function(bilgi)
    {
      var $promise=$http.post('http://localhost:8080/telefon/user_kontrol.php',bilgi);
      $promise.then(function(msg){
          var d_bilgi=msg.data;
          if(d_bilgi!="false"){
            $localStorage.setNesne("ogretmen",d_bilgi);
            $state.go('app.profile');
          }
          else{
            alert("HATALI GİRİS");
          }
        });
    }//girisKontrol:function(bilgi)
  }
})
.factory("$localStorage",function($window){
  return{
    set:function(key,value){$window.localStorage[key]=value;},
    get:function(key){return $window.localStorage[key]||"";},
    setNesne:function(key,value){$window.localStorage[key]=JSON.stringify(value);},
    getNesne:function(key){return JSON.parse($window.localStorage[key]||"{}");}
  }
});
