//页面入口
$(function(){
	//控制台
   $("#content").load('dashboard.html');
   $('#dashboard').click(function(){
     $("#content").load('dashboard.html');
   });

   //云主机资产
   $('#cloudHostingAssets').click(function(){
     $("#content").load('cloudHostingAssets.html');
     $('.pageheader h2 span').text("云主机资产");
   });

   //第三方资产
   $('#theThirdPartyAssets').click(function(){
     $("#content").load('theThirdPartyAssets.html');
     $('.pageheader h2 span').text("第三方资产");
   });

    //IT场景管理
   $('#ITmanagement').click(function(){
     $("#content").load('ITmanagement.html');
     $('.pageheader h2 span').text("IT场景管理");
   });
});