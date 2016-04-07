/* global angular, document, window */
'use strict';

angular.module('starter.services', [])
.factory("islemler",function($rootScope,$state,$http,$localStorage,$ionicLoading){
  return{
    girisKontrol:function(bilgi)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/user_kontrol.php',bilgi);
      $promise.then(function(msg){
            $ionicLoading.hide();
            var d_bilgi=msg.data;
            if(d_bilgi!="false"){
              $localStorage.setNesne("ogretmen",d_bilgi);
              $rootScope.active_ogrt=d_bilgi;
              $state.go('app.profile');
            }
          }
        );
    },//girisKontrol:function(bilgi)
    siniflariGetir:function(scope)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/siniflariGetir.php');
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.siniflar=msg.data;
        });
    },//siniflariGetir:function(bilgi)
    dersleriGetir:function(scope)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/dersleriGetir.php');
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.dersler=msg.data;
        });
    },//dersleriGetir:function(bilgi)
    ogretmenleriGetir:function(bilgi)
    {//DAHA YAPMADIM..
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/user_kontrol.php',bilgi);
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
    ogrencileriGetir:function(scope,snf)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/ogrenci_liste_getir.php',{'sinif':snf,'testId':76,'bironceki':true,'opt':3});
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.ogrenciler=msg.data;
          console.info(msg.data);
        });
    },//ogrencileriGetir:function(bilgi)
    sinifYoklamaGetir:function(scope,p)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      //var d=new Date(1439676000000);
      var d=new Date(parseInt(p.tarih));
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/yoklamayiGetir.php',{'sinif':p.sinif,'tarih':d,'ders':p.ders,'saat':p.saat});
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.ogrenciler=msg.data;
          console.info(msg.data);
        });
    },//sinifYoklamaGetir:function(bilgi)
    sinifYoklamaal:function(scope,p,o)
    {
      $ionicLoading.show({ template: '<div><span style="position: relative;top: -10px;">Yükleniyor...</span><ion-spinner class="spinner-calm spinner" icon="ripple"/></div>'});
      //var d=new Date(1439676000000);
      var d=new Date(parseInt(p.tarih));
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/yoklamaAl.php',{'sinif':p.sinif,'tarih':d,'ders':p.ders,'saat':p.saat,'ogr':o,'ogrt':$rootScope.active_ogrt.ogretmen_no});
      $promise.then(function(msg){
          $ionicLoading.hide();
          scope.ogrenciler=msg.data;
          console.info(msg.data);
        });
    },//sinifYoklamaal:function(bilgi)
    dersprogDersekle:function(ogrt,kacincisaat,gun,sinif,ders)
    {
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/dersprogDersekle.php',{'ogrt':ogrt,'saat':kacincisaat,'gun':gun,'sinif':sinif,'ders':ders});
      $promise.then(function(msg){
          console.info(msg.data);
          //$localStorage ve $rootScope.ders_prog
          $localStorage.setNesne("dersprog",msg.data);
          $rootScope.ders_prog=msg.data;
        });
    },//  dersprogDersekle:function(ogrt,kacincisaat,gun,sinif,ders)
    dersprogDerscikar:function(id,ogrt)
    {
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/dersprogDerscikar.php',{'id':id,'ogrt':ogrt});
      $promise.then(function(msg){
          console.info(msg.data);
          //$localStorage ve $rootScope.ders_prog
          $localStorage.setNesne("dersprog",msg.data);
          $rootScope.ders_prog=msg.data;
        });
    },//  dersprogDersekle:function(ogrt,kacincisaat,gun,sinif,ders)
    dersprogGetir:function(ogrt)
    {
      var $promise=$http.post('http://e-okulrehberlik.com/telefon/dersprogGetir.php',{'ogrt':ogrt});
      $promise.then(function(msg){
          console.info(msg.data);
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
