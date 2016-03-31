/* global angular, document, window */
'use strict';

angular.module('starter.services', [])
.factory("islemler",function($rootScope,$state,$http,$localStorage,$ionicLoading){
  return{
    girisKontrol:function(bilgi)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://localhost:8080/telefon/user_kontrol.php',bilgi);
      $promise.then(function(msg){
          $ionicLoading.hide();
          var d_bilgi=msg.data;
          if(d_bilgi!="false"){
            $localStorage.setNesne("ogretmen",d_bilgi);
            $rootScope.active_ogrt=d_bilgi;
            $state.go('app.profile');
          }
          else{
            alert("HATALI GİRİS");
          }
        });
    },//girisKontrol:function(bilgi)
    siniflariGetir:function(scope)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://localhost:8080/telefon/siniflariGetir.php');
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.siniflar=msg.data;
        });
    },//siniflariGetir:function(bilgi)
    dersleriGetir:function(scope)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://localhost:8080/telefon/dersleriGetir.php');
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.dersler=msg.data;
        });
    },//dersleriGetir:function(bilgi)
    ogretmenleriGetir:function(bilgi)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://localhost:8080/telefon/user_kontrol.php',bilgi);
      $promise.then(function(msg){
          $ionicLoading.hide();
          var d_bilgi=msg.data;
          if(d_bilgi!="false"){
            $localStorage.setNesne("ogretmen",d_bilgi);
            $rootScope.active_ogrt=d_bilgi;
            $state.go('app.profile');
          }
          else{
            alert("HATALI GİRİS");
          }
        });
    },//ogretmenleriGetir:function(bilgi)
    ogrencileriGetir:function(bilgi)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://localhost:8080/telefon/user_kontrol.php',bilgi);
      $promise.then(function(msg){
          $ionicLoading.hide();
          var d_bilgi=msg.data;
          if(d_bilgi!="false"){
            $localStorage.setNesne("ogretmen",d_bilgi);
            $rootScope.active_ogrt=d_bilgi;
            $state.go('app.profile');
          }
          else{
            alert("HATALI GİRİS");
          }
        });
    },//ogrencileriGetir:function(bilgi)
    dersprogDersekle:function(ogrt,kacincisaat,gun,sinif,ders)
    {
      var $promise=$http.post('http://localhost:8080/telefon/dersprogDersekle.php',{'ogrt':ogrt,'saat':kacincisaat,'gun':gun,'sinif':sinif,'ders':ders});
      $promise.then(function(msg){
          //$localStorage ve $rootScope.ders_prog
          $localStorage.setNesne("dersprog",msg.data);
          $rootScope.ders_prog=msg.data;
        });
    },//  dersprogDersekle:function(ogrt,kacincisaat,gun,sinif,ders)
    dersprogGetir:function(ogrt)
    {
      var $promise=$http.post('http://localhost:8080/telefon/dersprogGetir.php',{'ogrt':ogrt});
      $promise.then(function(msg){
          var bilgi=msg.data;
          $localStorage.setNesne('dersprog',bilgi);
          $rootScope.ders_prog=msg.data;
        });
    }//dersprogGetir:function(ogrt)
  }
})
.factory("$localStorage",function($window,$state){
  return{
    set:function(key,value){$window.localStorage[key]=value;},
    get:function(key){return $window.localStorage[key]||"";},
    setNesne:function(key,value){$window.localStorage[key]=JSON.stringify(value);},
    getNesne:function(key){return JSON.parse($window.localStorage[key]||"{}");},
    guvenlicikis:function(){$window.localStorage.clear();$state.go("app.login");}
  }
});
