// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'ionic-material', 'ionMdInput','ionic-datepicker','ionic-modal-select','angular.filter'])

.run(function($ionicPlatform,$rootScope,$localStorage,$state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    //gunler ile ilgili rootScope u ayarlıyorum
    $rootScope.gunler = [{'id':'1','gun':'Pazartesi','g':'Pt'},
                     {'id':'2','gun':'Salı','g':'Sl'},{'id':'3','gun':'Çarşamba','g':'Çr'},
                     {'id':'4','gun':'Perşembe','g':'Pr'},{'id':'5','gun':'Cuma','g':'Cm'},
                     {'id':'6','gun':'Cumartesi','g':'Ct'},{'id':'0','gun':'Pazar','g':'Pz'}];
    //ders saatleri ile ilgili
    $rootScope.derssaatleri=[1,2,3,4,5,6,7,8,9,10];
    //////////////////state değişimlerinin yakaladığım kısım
    $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
      var ogrt=$localStorage.getNesne("ogretmen");
      var dp=$localStorage.getNesne("dersprog");
      $rootScope.active_ogrt=ogrt;
      $rootScope.ders_prog=dp;
      if(toState.name!='app.login'&& !ogrt.ogretmen_no){
        event.preventDefault();
        $state.go("app.login");
      }
      if(toState.name=='app.login'&& ogrt.ogretmen_no){
        event.preventDefault();
        $state.go("app.profile");
      }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.ogrenciler', {
        url: '/ogrenciler',
        views: {
            'menuContent': {
                templateUrl: 'templates/ogrenciler.html',
                controller: 'OgrencilerCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.dersprogekle', {
        url: '/dersprogekle',
        views: {
            'menuContent': {
                templateUrl: 'templates/dersprogekle.html',
                controller: 'dersprogekleCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.dersprogramim', {
        url: '/dersprogramim',
        views: {
            'menuContent': {
                templateUrl: 'templates/dersprogramim.html',
                controller: 'dersprogramimCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-hide="active_ogrt.yetki==0" ui-sref="app.dersprogekle" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.yoklamasinif', {
        url: '/yoklamasinif/:tarih/:sinif/:ders/:saat',
        views: {
            'menuContent': {
                templateUrl: 'templates/yoklamasinif.html',
                controller: 'yoklamasinifCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" ng-hide="active_ogrt.yetki==0" ui-sref="app.dersprogekle" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
})
//datepicker ın config dosyası
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Sec',
      todayLabel: 'Bugun',
      closeLabel: 'Kapat',
      mondayFirst: true,
      weeksList: ["Pz", "Pt", "S", "Ç", "P", "C", "Ct"],
      monthsList: ["Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ags", "Eyl", "Eki", "Kas", "Ara"],
      templateType: 'popup',
      from: new Date(2015, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [0,6]//pazarla cumartesiyi kapattım
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  });
