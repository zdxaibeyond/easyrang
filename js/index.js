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

    //用户管理
   $('#userManagement').click(function(){
     $("#content").load('userManagement.html');
     $('.pageheader h2 span').text("用户管理");
   });

     //队伍管理
   $('#teamManagement').click(function(){
     $("#content").load('teamManagement.html');
     $('.pageheader h2 span').text("队伍管理");
   });

     //脚本管理
   $('#scriptManagement').click(function(){
     $("#content").load('scriptManagement.html');
     $('.pageheader h2 span').text("脚本管理");
   });

      //题目管理
   $('#subjectManagement').click(function(){
     $("#content").load('subjectManagement.html');
     $('.pageheader h2 span').text("题目管理");
   });
      //节点管理
   $('#nodeManagement').click(function(){
     $("#content").load('nodeManagement.html');
     $('.pageheader h2 span').text("节点管理");
   });

      //CTF管理
   $('#CTFManagement').click(function(){
     $("#content").load('CTFManagement.html');
     $('.pageheader h2 span').text("CTF比赛管理");
   });

      //靶场管理
   $('#rangManagement').click(function(){
     $("#content").load('rangManagement.html');
     $('.pageheader h2 span').text("靶场比赛管理");
   });

       //红蓝对抗管理
   $('#againstManagement').click(function(){
     $("#content").load('againstManagement.html');
     $('.pageheader h2 span').text("红蓝对抗比赛管理");
   });
    
});

