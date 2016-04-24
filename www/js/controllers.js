/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,$localStorage) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.cikisyap=function(){
      $localStorage.guvenlicikis();
    };
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope,$localStorage,islemler, $timeout, $stateParams, ionicMaterialInk,$rootScope,$state) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $scope.girisYap=function(bilgi){
      islemler.girisKontrol(bilgi);
    };
})

.controller('OgrencilerCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,islemler,$ionicModal) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(false);
    }, 300);
    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();
    // Set Ink
    ionicMaterialInk.displayEffect();
    ///////
    //modal kısmı
    $ionicModal.fromTemplateUrl('ogrencidetaymodal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
    $scope.ogrDetayModal=function(){
      $scope.modal.show();
    };
    ////
    $scope.secilenOgrenci = {'ad':'OGRENCİ','soyad':' SECİNİZ'};
    /*$scope.gunler = [{'id':'1','gun':'Pazartesi','g':'Pt'},
                     {'id':'2','gun':'Salı','g':'Sl'},{'id':'3','gun':'Çarşamba','g':'Çr'},
                     {'id':'4','gun':'Perşembe','g':'Pr'},{'id':'5','gun':'Cuma','g':'Cm'},
                     {'id':'6','gun':'Cumartesi','g':'Ct'},{'id':'0','gun':'Pazar','g':'Pz'}];
    */
    $scope.ogrencileriGoster=true;
    $scope.ogrenciDetayGoster=false;
    $scope.ogrenciler = islemler.ogrencileriGetir($scope);
    $scope.ogrenciDetayGosterF=function(yeni, eski)
    {
      $scope.ogrenciDetay=islemler.ogrenciDetayGetir($scope,yeni.tckno);
      $scope.ogrenciDetayGoster=true;
    }

    $scope.dersprog_ders_ekleme=function(ogrt,kacincisaat,gun,sinif,ders){
      islemler.dersprogDersekle(ogrt,kacincisaat,gun,sinif,ders);
    };
    $scope.dersprog_ders_cikar=function(id,ogrt){
      console.log(id);
      islemler.dersprogDerscikar(id,ogrt);
    };
})
.controller('yoklamasinifCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,islemler) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.ogrenciler=islemler.sinifYoklamaGetir($scope,$stateParams);
    $scope.ogrenciYok=false;
    $scope.yoklama_al=function(ogr)
    {
      console.info($stateParams);
      console.info(ogr);
      $scope.ogrenciler=islemler.sinifYoklamaal($scope,$stateParams,ogr);
    }
    // Delay expansion

    $timeout(function() {
        $scope.isExpanded = true;
        //$scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();
    //console.info($stateParams);
    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('dersprogekleCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,islemler) {

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  //$scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab('right');

  $timeout(function() {
      ionicMaterialMotion.fadeSlideIn({
          selector: '.animate-fade-slide-in .item'
      });
  }, 200);

  // Activate ink for controller
  ionicMaterialInk.displayEffect();
  ///////
  $scope.secilenGun ={'id':'-1','gun':'GUN SECİNİZ','g':''};
  $scope.secilenSinif = {'sinif_no':'0','seviye':'SINIF SEÇİNİZ','sube':'','okulad':'','arama':''};
  $scope.secilenDers = {'ders_no':'0','ders_ad':'DERS SECİNİZ'};
  /*$scope.gunler = [{'id':'1','gun':'Pazartesi','g':'Pt'},
                   {'id':'2','gun':'Salı','g':'Sl'},{'id':'3','gun':'Çarşamba','g':'Çr'},
                   {'id':'4','gun':'Perşembe','g':'Pr'},{'id':'5','gun':'Cuma','g':'Cm'},
                   {'id':'6','gun':'Cumartesi','g':'Ct'},{'id':'0','gun':'Pazar','g':'Pz'}];
  */
  $scope.siniflar = islemler.siniflariGetir($scope);
  $scope.dersler = islemler.dersleriGetir($scope);
  $scope.dersprog_ders_ekleme=function(ogrt,kacincisaat,gun,sinif,ders){
    islemler.dersprogDersekle(ogrt,kacincisaat,gun,sinif,ders);
  };
  $scope.dersprog_ders_cikar=function(id,ogrt){
    console.log(id);
    islemler.dersprogDerscikar(id,ogrt);
  };
})

.controller('ProfileCtrl', function($scope,islemler,$localStorage,$rootScope,$stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,ionicDatePicker) {
    // Set Header
    //var gunler=["Pazar","Pazartesi","Salı","Carsamba","Persembe","Cuma","Cumartesi"];
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.ogrtresim="img/ogretmen2.png";
    $scope.YoklamasinifSec=function(s,d){$rootScope.sinif=s;$rootScope.ders=d;}
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    //ders programı kısmı
    if(!$localStorage.getNesne("dersprog")[0]){islemler.dersprogGetir($localStorage.getNesne("ogretmen").ogretmen_no);}
    //datepicker kısmı
    var bugun=Date.now();
    var d=new Date();
    $scope.secilenTrh=bugun;
    $scope.hangigun=$rootScope.gunler[d.getDay()-1];
    var ipObj1 = {
    callback: function (val) {  //Mandatory
      var d=new Date(val);
      $scope.secilenTrh=val;
      $scope.hangigun=$rootScope.gunler[d.getDay()-1];
    },
    disabledDates: [            //Optional
      new Date("09-24-2015"),//KURBAN BAYRAMI
      new Date("09-25-2015"),//KURBAN BAYRAMI
      new Date("09-26-2015"),//KURBAN BAYRAMI
      new Date("09-27-2015"),//KURBAN BAYRAMI
      new Date("10-29-2015"),//29 ekim
      new Date("01-01-2016"),//YILBAŞI
      new Date("01-25-2016"),//yarıyıllll
      new Date("01-26-2016"),//yarıyıllll
      new Date("01-27-2016"),//yarıyıllll
      new Date("01-28-2016"),//yarıyıllll
      new Date("01-29-2016"),//yarıyıllll
      new Date("02-01-2016"),//yarıyıllll
      new Date("02-01-2016"),//yarıyıllll
      new Date("02-02-2016"),//yarıyıllll
      new Date("02-03-2016"),//yarıyıllll
      new Date("02-04-2016"),//yarıyıllll
      new Date("02-05-2016"),//yarıyıllll
      new Date("01-28-2016"),//yarıyıllll
      new Date("01-28-2016"),//yarıyıllll
      new Date("09-29-2015"),//KURBAN BAYRAMI
      //new Date(2016, 4, 23),//23 NİSAN
      //new Date(2015, 5, 19),//19 MAYIS
      //new Date('Wednesday, August 12, 2015'),
      //new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2015, 1, 1), //Optional
    to: Date.now(), //Optional YArının Yoklamasını almaya gerek yok değilmi...
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0,6],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('dersprogramimCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,islemler) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    //$scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
