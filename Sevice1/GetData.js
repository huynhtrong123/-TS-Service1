const endpointUrl = "opc.tcp://127.0.0.1:4870",
	  urlbroker   = 'mqtt://127.0.0.1:3003';
	  
var   opcua = require("node-opcua"),
	  async = require("async"),
      client = new opcua.OPCUAClient(),
	  opc_items = new Array(),
	  items_idx = 0,
	  monitored_items = new Array(),
	  the_session = null,
	  mqtt = require('mqtt'),
	  TopicName = "HMI1/Data",
	  mqttclient  = mqtt.connect(urlbroker);



mqttclient.on("connect",function(){	
console.log("mqtt connected");

})
 

/////////////////OPCUAClient//////////////////////////////////////////
async.series([


    // step 1 : connect to
    function(callback)  {

        client.connect(endpointUrl,function (err) {

            if(err) {
                console.log(" cannot connect to endpoint :" , endpointUrl );
            } else {
                console.log("connected !");
            }
            callback(err);
        });
    },
    // step 2 : createSession
    function(callback) {
        client.createSession( function(err,session) {
            if(!err) {
                the_session = session;
            }
            callback(err);
        });

    },
   
    // create subscription
    function(callback) {

        the_subscription=new opcua.ClientSubscription(the_session,{
            requestedPublishingInterval: 1000,
            requestedLifetimeCount: 10,
            requestedMaxKeepAliveCount: 2,
            maxNotificationsPerPublish: 10,
            publishingEnabled: true,
            priority: 10
        });
        the_subscription.on("started",function(){
            //console.log("subscription started for 2 seconds - subscriptionId=",the_subscription.subscriptionId);
        }).on("keepalive",function(){
           // console.log("keepalive");
        }).on("terminated",function(){
            callback();
        });
       
		
			ids = [
			
				"MAIN_01_VAR_ga_m_alarmestopword{0}",
				"MAIN_01_VAR_ga_m_alarmestopword{1}",
				"MAIN_01_VAR_ga_m_alarmestopword{10}",
				"MAIN_01_VAR_ga_m_alarmestopword{11}",
				"MAIN_01_VAR_ga_m_alarmestopword{12}",
				"MAIN_01_VAR_ga_m_alarmestopword{13}",
				"MAIN_01_VAR_ga_m_alarmestopword{14}",
				"MAIN_01_VAR_ga_m_alarmestopword{15}",
				"MAIN_01_VAR_ga_m_alarmestopword{2}",
				"MAIN_01_VAR_ga_m_alarmestopword{3}",
				"MAIN_01_VAR_ga_m_alarmestopword{4}",
				"MAIN_01_VAR_ga_m_alarmestopword{5}",
				"MAIN_01_VAR_ga_m_alarmestopword{6}",
				"MAIN_01_VAR_ga_m_alarmestopword{7}",
				"MAIN_01_VAR_ga_m_alarmestopword{8}",
				"MAIN_01_VAR_ga_m_alarmestopword{9}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{0}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{1}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{10}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{11}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{12}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{2}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{3}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{4}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{5}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{6}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{7}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{8}",
				"MAIN_01_VAR_ga_m_alarmhardfaultword{9}",
				"MAIN_01_VAR_ga_m_alarminfoword{0}",
				"MAIN_01_VAR_ga_m_alarminfoword{1}",
				"MAIN_01_VAR_ga_m_alarminfoword{2}",
				"MAIN_01_VAR_ga_m_alarminfoword{3}",
				"MAIN_01_VAR_ga_m_alarminfoword{4}",
				"MAIN_01_VAR_ga_m_alarminfoword{5}",
				"MAIN_01_VAR_ga_m_alarminfoword{6}",
				"MAIN_01_VAR_ga_m_alarminfoword{7}",
				"MAIN_01_VAR_ga_m_alarmstopword{0}",
				"MAIN_01_VAR_ga_m_alarmstopword{1}",
				"MAIN_01_VAR_ga_m_alarmstopword{10}",
				"MAIN_01_VAR_ga_m_alarmstopword{11}",
				"MAIN_01_VAR_ga_m_alarmstopword{12}",
				"MAIN_01_VAR_ga_m_alarmstopword{13}",
				"MAIN_01_VAR_ga_m_alarmstopword{14}",
				"MAIN_01_VAR_ga_m_alarmstopword{15}",
				"MAIN_01_VAR_ga_m_alarmstopword{2}",
				"MAIN_01_VAR_ga_m_alarmstopword{3}",
				"MAIN_01_VAR_ga_m_alarmstopword{4}",
				"MAIN_01_VAR_ga_m_alarmstopword{5}",
				"MAIN_01_VAR_ga_m_alarmstopword{6}",
				"MAIN_01_VAR_ga_m_alarmstopword{7}",
				"MAIN_01_VAR_ga_m_alarmstopword{8}",
				"MAIN_01_VAR_ga_m_alarmstopword{9}",
				"MAIN_01_VAR_ga_m_alarmwarnword{0}",
				"MAIN_01_VAR_ga_m_alarmwarnword{1}",
				"MAIN_01_VAR_ga_m_alarmwarnword{2}",
				"MAIN_01_VAR_ga_m_alarmwarnword{3}",
				"MAIN_01_VAR_ga_m_alarmwarnword{4}",
				"MAIN_01_VAR_ga_m_alarmwarnword{5}",
				"MAIN_01_VAR_ga_m_alarmwarnword{6}",
				"MAIN_01_VAR_ga_m_alarmwarnword{7}",
				"MAIN_03_SLVAR_gs_m_productdata{1}_discardnum",
				"MAIN_03_SLVAR_gs_m_productdata{1}_productnum",
				"MAIN_03_SLVAR_gs_m_productdata{1}_productratio",
				"MAIN_03_SLVAR_gs_m_productdata{1}_recordnum",
				"MAIN_04_HMI_HMI_m_currentspeed",
				"MAIN_04_HMI_HMI_m_fanmotortestmode",
				"MAIN_04_HMI_HMI_m_productsize",
				"MAIN_04_HMI_HMI_m_speedsetpoint",
				"MAIN_04_HMI_HMI_m_speedsetpointADD{1}",
				"MAIN_04_HMI_HMI_m_speedsetpointADD{2}",
				"MAIN_04_HMI_HMI_m_speedsetpointADD{3}",
				"MAIN_04_HMI_HMI_m_temppos{1}"
		];
		

		
			
    


  // install monitored items
        //items_idx = 0;
        console.log("Len " + ids.length);
        ids.forEach(function (ids) {
			 var opc_item = "ns=3;s="+ids;
            monitored_items[items_idx] = the_subscription.monitor({
                nodeId: opcua.resolveNodeId(opc_item),
                attributeId: 13
            },
            {
                samplingInterval: 100,
                discardOldest: true,
                queueSize: 10
            });

             monitored_items[items_idx].on("changed", function (value) {
				var mesage ='{ "TagName" :'+'"'+ids+'"'+','+ '"Value":' + value.value.value + '}';
			   //send data from here ;
                console.log(mesage);
				mqttclient.publish(TopicName,mesage);
				console.log("********************************");
				

            });

            items_idx = items_idx + 1;
        });

			},
			






    // ------------------------------------------------
    // closing session
    //
    function(callback) {
        console.log(" closing session");
        the_session.close(function(err){

            console.log(" session closed");
            callback();
        });
    },


],
    function(err) {
        if (err) {
            console.log(" failure ",err);
        } else {
            console.log("done!")
        }
        client.disconnect(function(){});
    }) ;



