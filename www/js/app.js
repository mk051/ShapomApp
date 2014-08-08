(function(){
//	'use strict';
//	angular.module('myApp', ['onsen.directives']);

  'use strict';
  var module = angular.module('myApp', ['onsen']);

  module.factory('$data', function() {
      var data = {};            
      return data;
  });

})();

function basic_radar(container) {

  // Fill series s1 and s2.
  var
    s1 = { label : '右', data : [[0, 3], [1, 8], [2, 5], [3, 5], [4, 3], [5, 9]] },
    s2 = { label : '左', data : [[0, 8], [1, 7], [2, 8], [3, 2], [4, 4], [5, 7]] },
    graph, ticks;

  // Radar Labels
  ticks = [
    [0, "AAA"],
    [1, "BBB"],
    [2, "CCC"],
    [3, "DDD"],
    [4, "EEE"],
    [5, "FFF"]
  ];

  // Draw the graph.
  graph = Flotr.draw(container, [ s1, s2 ], {
    radar : { show : true}, 
    grid  : { circular : true, minorHorizontalLines : true}, 
    yaxis : { min : 0, max : 10, minorTickFreq : 2}, 
    xaxis : { ticks : ticks}
  });
};

function BattlePageController($scope)
{
  $scope.$on('$viewContentLoaded', function() {
    //call it here
  });

  $scope.click_ShowGraph=function(){
    basic_radar(document.getElementById("editor-render-0"));
  };
}




function getMedia(container) {
  navigator.getUserMedia = navigator.getUserMedia       || 
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia    || 
                           navigator.msGetUserMedia;
  navigator.getUserMedia({video: true},
    function(localMediaStream) {
      var myVideo     = container;
          myVideo.src = window.URL.createObjectURL(localMediaStream);
          myVideo.play();
    },
    function(err) {
      alert('カメラから映像を取得することができませんでした。');  
      console.log(err);
    }
  );
}

function CameraPageController($scope)
{
  $scope.click_Shutter=function(){
//    function getCamera(){
    var myVideo  = document.getElementById('myVideo');
    var myCanvas = document.getElementById('myCanvas');
    var ctx      = myCanvas.getContext("2d");
    ctx.drawImage(myVideo, 0, 0,320,240);
    document.getElementById("myImg").src = myCanvas.toDataURL("image/png");

  };

  $scope.init=function(){

    if (!(navigator.getUserMedia       || 
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia    || 
          navigator.msGetUserMedia     )) 
    {
      alert('UserMediaがサポートされていません');
    }
    getMedia(document.getElementById('myVideo'));
  };

}

