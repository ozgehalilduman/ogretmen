/* global angular, document, window */
'use strict';

angular.module('starter.services', [])
.factory("islemler",function($rootScope,$state){
  return{
    girisKontrol:function(bilgi)
    {
      var ogretmen={"id":"1","ad":"Özge Halil","soyad":"DUMAN"}
      if(bilgi.user=="ogrt"&&bilgi.paswd=="123")
      {
        return ogretmen;
      }
      else
      {
        return "Hata";
      }
    }
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
